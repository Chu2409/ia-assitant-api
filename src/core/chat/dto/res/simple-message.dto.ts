import { ApiProperty } from '@nestjs/swagger'

export class SimpleMessageResDto {
  @ApiProperty({
    description: 'Reply from the AI',
    example: 'NestJS is a framework for building server-side applications',
  })
  reply: string
}
