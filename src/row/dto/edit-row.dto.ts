import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from '../../helpers/types';

export class CreateRowDto {
  @ApiProperty()
  data: Dictionary;
}
