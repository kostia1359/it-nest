import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from '../../helpers/types';

export class DictionaryDto {
  @ApiProperty({
    type: [Object],
  })
  data: Dictionary;
}
