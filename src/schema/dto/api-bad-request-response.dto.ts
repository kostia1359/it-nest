import { ApiProperty } from '@nestjs/swagger';

export class ApiBadRequestResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
