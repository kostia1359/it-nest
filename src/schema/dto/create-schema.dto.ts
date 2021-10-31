import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSchemaDto {
  @IsString()
  @ApiProperty()
  dbName: string;
}
