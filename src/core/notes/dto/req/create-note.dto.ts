import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsString, Length } from 'class-validator'

export class CreateNoteReqDto {
  @ApiProperty({
    description: 'Title of the note',
    example: 'My first note',
  })
  @IsString()
  @Length(1, 100)
  title: string

  @ApiProperty({
    description: 'Content of the note',
    example: 'This is the content of my first note.',
  })
  @IsString()
  content: string

  @ApiProperty({
    description: 'Tags associated with the note',
    example: [1, 2, 3],
  })
  @IsNumber({}, { each: true })
  @IsArray()
  tagsIds: number[]
}
