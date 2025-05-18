import { ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { CreateNoteReqDto } from './create-note.dto'
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'

export class UpdateNoteDto extends PartialType(CreateNoteReqDto) {
  @ApiPropertyOptional({
    description: 'Title of the note',
    example: 'My first note',
  })
  @IsString()
  @Length(1, 100)
  @IsOptional()
  title?: string

  @ApiPropertyOptional({
    description: 'Content of the note',
    example: 'This is the content of my first note.',
  })
  @IsString()
  @IsOptional()
  content?: string

  @ApiPropertyOptional({
    description: 'Tags associated with the note',
    example: [1, 2, 3],
  })
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  tagsIds?: number[]
}
