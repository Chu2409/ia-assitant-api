import { ApiProperty } from '@nestjs/swagger'
import { MessageRole } from '@prisma/client'

export class SingleMessageResDto {
  @ApiProperty({
    example: 1,
    description: 'Message ID',
  })
  id: number

  @ApiProperty({
    example: 'Hello, world!',
    description: 'Message content',
  })
  content: string

  @ApiProperty({
    example: 'Test',
    description: 'Session metadata',
  })
  metadata: string | null

  @ApiProperty({
    example: MessageRole.user,
    description: 'Message role',
    enum: MessageRole,
  })
  role: MessageRole

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: 'Message creation date',
  })
  createdAt: Date
}
