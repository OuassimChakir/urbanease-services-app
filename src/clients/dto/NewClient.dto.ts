import { IsNotEmpty, IsString } from 'class-validator';
import { format } from 'date-fns';

export class NewClientDto {
  @IsNotEmpty()
  @IsString()
  dateJointure: string = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
}
