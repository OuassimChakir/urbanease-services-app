import { Module } from '@nestjs/common';
import { CycleIngController } from './cycle-ing/cycle-ing.controller';
import { CycleIngService } from './cycle-ing/cycle-ing.service';

@Module({
  controllers: [CycleIngController],
  providers: [CycleIngService],
})
export class Tp2Module {}
