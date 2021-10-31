import { ApiProperty } from '@nestjs/swagger';

export class GetSchemaNamesResponseDto {
  @ApiProperty({ type: [String] })
  data: string[];
}
