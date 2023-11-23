import { Controller, Get, Param } from '@nestjs/common';

@Controller('cycle-ing')
export class CycleIngController {
  informations(): any[] {
    const table = ['nbModules', 'Génie Informatique', 'FSTE'];
    return table;
  }

  @Get('/cycleIng/etudiants/:promo?')
  etudiants(@Param('promo') promo?: number): any[] {
    // Nom, Matricule, Age, promotion
    const students: any[] = [
      ['Ouassim Chakir', 'M130109172', 22, 2],
      ['AFROUKH OUSSAMA', 'D137106418', 21, 2],
      ['AMOKRANE AYMAN', 'M130081175', 21, 1],
      ['ECH-CHAKFY AMINA', 'M130209172', 21, 3],
    ];

    if (promo) {
      let tab: any[] = [];
      for (const student of students) {
        if (student[3] == promo) tab = student;
      }
      return tab;
    }

    return students;
  }
}
