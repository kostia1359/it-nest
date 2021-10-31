import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SelectTableDto {
  @IsString()
  @ApiProperty()
  tableName: string;
}
