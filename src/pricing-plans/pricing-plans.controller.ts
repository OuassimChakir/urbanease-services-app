import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PricingPlansService } from './pricing-plans.service';
import { CreatePlanDto } from './dto/CreatePlan.dto';
import { PlanEntity } from '../migrations/plan.entity';
import { AddPlanItemsDto } from './dto/AddPlanItems.dto';
import { UpdatePlanDto } from './dto/UpdatePlan.dto';

@Controller('pricing-plans')
export class PricingPlansController {
  constructor(private planService: PricingPlansService) {}
  @Get(':idPlan')
  getPricingPlan(@Param('idPlan') idPlan: number): Promise<PlanEntity> {
    return this.planService.getPricingPlan(idPlan);
  }

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

  @Patch(':idPlan/update')
  updatePricingPlan(
    @Param('idPlan') idPlan: number,
    @Body() updatePlanDto: UpdatePlanDto,
    @Body('items') items: AddPlanItemsDto[],
  ): Promise<PlanEntity> {
    return this.planService.updatePricingPlan(idPlan, updatePlanDto, items);
  }

  @Delete(':idPlan/delete')
  deletePlan(@Param('idPlan') idPlan: number) {
    return this.planService.deletePricingPlan(idPlan);
  }
}
