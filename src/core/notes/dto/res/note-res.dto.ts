import { ApiProperty } from '@nestjs/swagger'
import { TagResDto } from 'src/core/tags/dto/res/tag-res.dto'

export class NoteResDto {
  @ApiProperty({
    description: 'The unique identifier of the note',
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'The title of the note',
    example: 'My Note',
  })
  title: string

  @ApiProperty({
    description: 'The content of the note',
    example: 'This is my note',
  })
  content: string

  @ApiProperty({
    description: 'Created at date',
    example: '2023-10-01T12:00:00Z',
  })
  createdAt: Date

  @ApiProperty({
    description: 'Updated at date',
    example: '2023-10-01T12:00:00Z',
  })
  updatedAt: Date

  @ApiProperty({
    description: 'The list of tags associated with the note',
    type: [TagResDto],
  })
  tags: TagResDto[]
}
