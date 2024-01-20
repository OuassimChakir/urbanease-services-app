import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../migrations/client.entity';
import { Repository } from 'typeorm';
import { PlanEntity } from '../migrations/plan.entity';
import { SubscriptionEntity } from '../migrations/subscription.entity';
import { SubscriptionStatusEnum } from './subscription-status.enum';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepo: Repository<ClientEntity>,
    @InjectRepository(PlanEntity)
    private planRepo: Repository<PlanEntity>,
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepo: Repository<SubscriptionEntity>,
  ) {}

  async newSubscription(
    client: ClientEntity,
    plan: PlanEntity,
    startDate: string,
    endDate: string,
    status: SubscriptionStatusEnum,
    credit: number,
  ): Promise<SubscriptionEntity> {
    if (isNaN(credit)) {
      credit = 0;
    }
    const subscription: SubscriptionEntity = this.subscriptionRepo.create({
      startDate,
      endDate,
      status,
      credit,
      client,
      plan,
    });

    return await this.subscriptionRepo.save(subscription);
  }

  async newOneSubscription(
    client: ClientEntity,
    plan: PlanEntity,
  ): Promise<SubscriptionEntity> {
    const subscription: SubscriptionEntity = this.subscriptionRepo.create({
      client,
      plan,
    });

    return await this.subscriptionRepo.save(subscription);
  }

  async getSubscription(idClient, idPlan): Promise<SubscriptionEntity> {
    return await this.subscriptionRepo.findOne({
      where: {
        client: { idClient: idClient },
        plan: { idPlan: idPlan },
      },
    });
  }

  async getSubscriptionById(
    idSubscription: number,
  ): Promise<SubscriptionEntity> {
    return await this.subscriptionRepo.findOne({
      where: { idSubscription: idSubscription },
      relations: {
        plan: true,
        client: true,
      },
    });
  }

  async renewSubscription(
    subscription: SubscriptionEntity,
    endDate: string,
    credit: number,
  ): Promise<SubscriptionEntity> {
    subscription.endDate = endDate;
    subscription.credit = credit;
    return await this.subscriptionRepo.save(subscription);
  }

  async updateSubscriptionCredit(
    subscription: SubscriptionEntity,
    newCredit: number,
  ): Promise<SubscriptionEntity> {
    subscription.credit = newCredit;
    return await this.subscriptionRepo.save(subscription);
  }
}

