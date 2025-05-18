import { ApiProperty } from '@nestjs/swagger'

export class TagResDto {
  @ApiProperty({
    description: 'The unique identifier of the tag',
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'The name of the tag',
    example: 'nestjs',
  })
  name: string

  @ApiProperty({
    description: 'The color of the tag',
    example: '#ff0000',
  })
  color?: string
}
