import { ApiProperty } from '@nestjs/swagger';

export class GetConfigDto {
  @ApiProperty()
  clientId: string;
}
