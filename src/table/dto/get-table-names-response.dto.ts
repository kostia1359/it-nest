import { ApiProperty } from '@nestjs/swagger';

export class GetTableNamesResponseDto {
  @ApiProperty({ type: [String] })
  data: string[];
}
