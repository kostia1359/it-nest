import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from '../../helpers/types';
import { IsNumber } from 'class-validator';

export class EditRowDto {
  @IsNumber()
  @ApiProperty()
  rowNumber: number;

  @ApiProperty()
  data: Dictionary;
}
