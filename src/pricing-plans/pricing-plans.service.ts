import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from '../migrations/plan.entity';
import { Repository } from 'typeorm';
import { PlanItemsEntity } from '../migrations/plan-items.entity';
import { CreatePlanDto } from './dto/CreatePlan.dto';
import { AddPlanItemsDto } from './dto/AddPlanItems.dto';
import { ServiceEntity } from '../migrations/service.entity';
import { UpdatePlanDto } from './dto/UpdatePlan.dto';

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

  async updatePricingPlan(
    idPlan: number,
    updatePlanDto: UpdatePlanDto,
    items: AddPlanItemsDto[],
  ) {
    const { planName, price, planType, idService } = updatePlanDto;
    const plan = await this.planRepo.findOneBy({ idPlan: idPlan });
    if (!plan) {
      throw new NotFoundException(`Plan ID ${idPlan} Not Found!`);
    }

    const service = await this.serviceRepo.findOneBy({ idService: idService });
    if (!service) {
      throw new NotFoundException(`Service ID ${idPlan} Not Found!`);
    }

    plan.planName = planName;
    plan.price = price;
    plan.planType = planType;
    plan.service = service;
    const newPlan: PlanEntity = await this.planRepo.save(plan);
    await this.deletePlanItem(newPlan);
    await this.addPlanItems(newPlan, items);

    return newPlan;
  }

  async deletePricingPlan(idPlan: number) {
    const plan = await this.planRepo.findOneBy({ idPlan: idPlan });
    if (!plan) {
      throw new NotFoundException(`Plan ID ${idPlan} Not Found!`);
    }

    const planItems = await this.planItemRepo.find({
      where: { plan: { idPlan: plan.idPlan } },
      relations: {
        plan: true,
      },
    });
    await this.planItemRepo.remove(planItems);

    return await this.planRepo.remove(plan);
  }

  async getPricingPlan(idPlan: number): Promise<PlanEntity> {
    const plan = await this.planRepo.findOne({
      where: { idPlan: idPlan },
      relations: {
        planItems: true,
      },
    });

    if (!plan) {
      throw new NotFoundException(`Plan ID ${idPlan} Not Found!`);
    }
    return plan;
  }

  async getServicePlans(idService: number) {
    const service: ServiceEntity = await this.serviceRepo.findOneBy({
      idService: idService,
    });
    if (!service) {
      throw new NotFoundException(`Service ID ${idService} Not Found!`);
    }
    const servicePlans: PlanEntity[] = await this.planRepo.find({
      where: { service: { idService: service.idService } },
      relations: {
        planItems: true,
      },
    });
    service.plans = servicePlans;
    return service;
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

  async deletePlanItem(plan: PlanEntity) {
    const planItems: PlanItemsEntity[] = await this.planItemRepo.find({
      where: { plan: { idPlan: plan.idPlan } },
      relations: {
        plan: true,
      },
    });
    await this.planItemRepo.remove(planItems);
  }
}
