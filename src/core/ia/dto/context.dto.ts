import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { MessageRole } from '@prisma/client'

export class ContextDto {
  @IsEnum(MessageRole)
  role: MessageRole

  @IsString()
  @IsNotEmpty()
  content: string
}
