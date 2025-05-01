import { ApiProperty } from '@nestjs/swagger'

export class SingleSessionResDto {
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
    example: 1,
    description: 'User ID',
  })
  userId: number

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: 'Session Start Date',
  })
  startedAt: Date
}
