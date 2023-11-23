import { Module } from '@nestjs/common';
import { CycleIngController } from './cycle-ing/cycle-ing.controller';

@Module({
  controllers: [CycleIngController],
})
export class Tp2Module {}
