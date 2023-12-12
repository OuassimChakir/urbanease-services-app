import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from '../migrations/plan.entity';
import { Repository } from 'typeorm';
import { PlanItemsEntity } from '../migrations/plan-items.entity';
import { CreatePlanDto } from './dto/CreatePlan.dto';
import { AddPlanItemsDto } from './dto/AddPlanItems.dto';
import { ServiceEntity } from '../migrations/service.entity';

@Injectable()
export class PricingPlansService {
  constructor(
    @InjectRepository(PlanEntity)
    private planRepo: Repository<PlanEntity>,
    @InjectRepository(PlanItemsEntity)
    private planItemRepo: Repository<PlanItemsEntity>,
    @InjectRepository(ServiceEntity)
    private serviceRepo: Repository<ServiceEntity>,
  ) {}

  /* ------------- Pricing Plans ---------------- */
  async addPricingPlan(createPlanDto: CreatePlanDto): Promise<PlanEntity> {
    const { planName, price, planType, idService } = createPlanDto;
    const service: ServiceEntity = await this.serviceRepo.findOneBy({
      idService: idService,
    });
    if (!service) {
      throw new NotFoundException(`Service ID ${idService} Not Found`);
    }

    const plan: PlanEntity = this.planRepo.create({
      planName,
      price,
      planType,
      service,
    });

    return await this.planRepo.save(plan);
  }

  async deletePricingPlan(idPlan: number) {
    const plan = await this.planRepo.findOneBy({ idPlan: idPlan });
    if (!plan) {
      throw new NotFoundException(`Plan ID ${idPlan} Not Found!`);
    }

    const planItems = await this.planItemRepo.find({
      relations: {
        plan: true,
      },
    });
    await this.planItemRepo.remove(planItems);

    return await this.planRepo.remove(plan);
  }

  /* ------------- Plan Items ---------------- */
  async addPlanItems(plan: PlanEntity, items: AddPlanItemsDto[]) {
    for (const itemDto of items) {
      const { item, value } = itemDto;
      const planItem = this.planItemRepo.create({
        item,
        value,
        plan,
      });
      await this.planItemRepo.save(planItem);
    }
  }
}
