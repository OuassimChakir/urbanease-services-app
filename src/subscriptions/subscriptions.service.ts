import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../migrations/client.entity';
import { Repository } from 'typeorm';
import { PlanEntity } from '../migrations/plan.entity';
import { SubscriptionEntity } from '../migrations/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepo: Repository<ClientEntity>,
    @InjectRepository(PlanEntity)
    private planRepo: Repository<PlanEntity>,
    @InjectRepository(ClientEntity)
    private subscriptionRepo: Repository<SubscriptionEntity>,
  ) {}
}
