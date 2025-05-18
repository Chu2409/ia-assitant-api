import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class SimplePromptReqDto {
  @ApiProperty({
    description: 'prompt',
    example: 'Qué es NestJS?',
  })
  @IsString({ message: 'prompt must be a string' })
  prompt: string
}
