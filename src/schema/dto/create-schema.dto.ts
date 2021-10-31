import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDBDto {
  @IsString()
  @ApiProperty()
  dbName: string;
}
