import { Controller, Get, Param } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CycleIngService } from './cycle-ing.service';

@Controller('cycle-ing')
export class CycleIngController {
  constructor(private CycleIngService: CycleIngService) {}

  @Get()
  informations(): any[] {
    return this.CycleIngService.informations();
  }

  @Get('/etudiants/:promo?')
  etudiants(@Param('promo') promo?: number): any[] {
    if (promo) return this.CycleIngService.etudiants(promo);
    else return this.CycleIngService.etudiants(promo);
  }
}
