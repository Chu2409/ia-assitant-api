import { ApiProperty } from '@nestjs/swagger'
import { SingleMessageResDto } from 'src/core/messages/dto/res/single-message-res.dto'

export class SessionMessagesResDto {
  @ApiProperty({
    example: 1,
    description: 'Session ID',
  })
  id: number

  @ApiProperty({
    example: 'Session Title',
    description: 'Session Title',
  })
  title: string

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: 'Session Start Date',
  })
  startedAt: Date

  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  userId: number

  @ApiProperty({
    type: [SingleMessageResDto],
    description: 'List of messages in the session',
  })
  messages: SingleMessageResDto[]
}
