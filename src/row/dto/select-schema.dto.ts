import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SelectSchemaDto {
  @IsString()
  @ApiProperty()
  schemaName: string;
}
