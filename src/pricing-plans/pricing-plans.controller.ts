import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { PricingPlansService } from './pricing-plans.service';
import { CreatePlanDto } from './dto/CreatePlan.dto';
import { PlanEntity } from '../migrations/plan.entity';
import { AddPlanItemsDto } from './dto/AddPlanItems.dto';

@Controller('pricing-plans')
export class PricingPlansController {
  constructor(private planService: PricingPlansService) {}

  @Post('/new')
  addPricingPlan(
    @Body() createPlanDto: CreatePlanDto,
    @Body('items') items: AddPlanItemsDto[],
  ): Promise<PlanEntity> {
    const plan: Promise<PlanEntity> =
      this.planService.addPricingPlan(createPlanDto);
    plan
      .then(async (planEntity: PlanEntity) => {
        await this.planService.addPlanItems(planEntity, items);
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
    return plan;
  }

  @Delete(':idPlan/delete')
  deletePlan(@Param('idPlan') idPlan: number) {
    return this.planService.deletePricingPlan(idPlan);
  }
}
