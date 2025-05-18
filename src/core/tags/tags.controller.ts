import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  Req,
} from '@nestjs/common'
import { TagsService } from './tags.service'
import { CreateTagReqDto } from './dto/req/create-tag.dto'
import { UpdateTagReqDto } from './dto/req/update-tag.dto'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { ApiStandardResponse } from 'src/common/decorators/api-standard-response.decorator'
import { TagResDto } from './dto/res/tag-res.dto'
import { Request } from 'express'
import { Auth } from '../auth/decorators/auth.decorator'

@Controller('tags')
@Auth()
@ApiBearerAuth()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new tag',
  })
  @ApiStandardResponse(Boolean, HttpStatus.CREATED)
  create(@Body() createTagDto: CreateTagReqDto, @Req() req: Request) {
    const userId = req.user!['id'] as number
    return this.tagsService.create(userId, createTagDto)
  }

  @Get('/by-user')
  @ApiOperation({
    summary: 'Get all tags by user ID',
  })
  @ApiStandardResponse(TagResDto)
  findByUserId(@Req() req: Request) {
    const userId = req.user!['id'] as number

    return this.tagsService.findAllByUserId(userId)
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a tag by ID',
  })
  @ApiStandardResponse(Boolean)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagReqDto,
    @Req() req: Request,
  ) {
    const userId = req.user!['id'] as number

    return this.tagsService.update(id, userId, updateTagDto)
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a tag by ID',
  })
  @ApiStandardResponse(Boolean)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.remove(id)
  }
}
