import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from '../../helpers/types';

export class CreateTableDto {
  @IsString()
  @ApiProperty()
  tableName: string;

  @ApiProperty()
  schema: Dictionary;
}
