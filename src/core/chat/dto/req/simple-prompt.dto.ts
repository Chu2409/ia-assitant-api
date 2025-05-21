import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class SimplePromptReqDto {
  @ApiProperty({
    description: 'prompt',
    example: 'Qué es NestJS?',
  })
  @IsString({ message: 'prompt must be a string' })
  @IsNotEmpty({ message: 'prompt is required' })
  prompt: string
}
