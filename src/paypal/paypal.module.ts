import { Module } from '@nestjs/common';
import { PaypalController } from './paypal.controller';
import { PaypalService } from './paypal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from '../migrations/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanEntity])],
  controllers: [PaypalController],
  providers: [PaypalService],
})
export class PaypalModule {}
