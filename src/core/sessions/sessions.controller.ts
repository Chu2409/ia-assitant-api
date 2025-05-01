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
} from '@nestjs/common'
import { SessionsService } from './sessions.service'
import { CreateSessionDto } from './dto/req/create-session.dto'
import { UpdateSessionDto } from './dto/req/update-session.dto'
import { ApiOperation } from '@nestjs/swagger'
import { ApiStandardResponse } from 'src/common/decorators/api-standard-response.decorator'
import { SingleSessionResDto } from './dto/res/simple-session-res.dto'
import { SessionMessagesResDto } from './dto/res/session-messages-res.dto'

@Controller('sessions')
export class SessionsController {
  constructor(private readonly service: SessionsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new session',
  })
  @ApiStandardResponse(SingleSessionResDto, HttpStatus.CREATED)
  create(@Body() dto: CreateSessionDto) {
    return this.service.create(dto)
  }

  // @Get()
  // findAll(@Query() paginationDto: SessionFiltersDto) {
  //   return this.service.findAll(paginationDto)
  // }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a session by ID',
  })
  @ApiStandardResponse(SessionMessagesResDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a session by ID',
  })
  @ApiStandardResponse(SingleSessionResDto)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSessionDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a session by ID',
  })
  @ApiStandardResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}
