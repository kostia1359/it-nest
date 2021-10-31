import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteTableDto {
  @IsString()
  @ApiProperty()
  tableName: string;
}
