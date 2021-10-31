import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from '../../helpers/types';
import { IsObject } from 'class-validator';

export class CreateRowDto {
  @ApiProperty()
  @IsObject()
  data: Dictionary;
}
