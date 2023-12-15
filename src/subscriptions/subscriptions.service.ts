import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../migrations/client.entity';
import { Repository } from 'typeorm';
import { PlanEntity } from '../migrations/plan.entity';
import { SubscriptionEntity } from '../migrations/subscription.entity';
import { NewSubscriptionDto } from './dto/NewSubscription.dto';
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
  ): Promise<SubscriptionEntity> {
    const subscription: SubscriptionEntity = this.subscriptionRepo.create({
      startDate,
      endDate,
      status,
      client,
      plan,
    });

    return await this.subscriptionRepo.save(subscription);
  }
}
