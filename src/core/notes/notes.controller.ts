import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  HttpStatus,
} from '@nestjs/common'
import { NotesService } from './notes.service'
import { CreateNoteReqDto } from './dto/req/create-note.dto'
import { UpdateNoteDto } from './dto/req/update-note.dto'
import { Auth } from '../auth/decorators/auth.decorator'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'
import { ApiStandardResponse } from 'src/common/decorators/api-standard-response.decorator'
import { NoteResDto } from './dto/res/note-res.dto'

@Controller('notes')
@Auth()
@ApiBearerAuth()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new tag',
  })
  @ApiStandardResponse(Boolean, HttpStatus.CREATED)
  create(@Body() createNoteDto: CreateNoteReqDto, @Req() req: Request) {
    const userId = req.user!['id'] as number
    return this.notesService.create(userId, createNoteDto)
  }

  @Get()
  @ApiOperation({
    summary: 'Get all notes by user ID',
  })
  @ApiStandardResponse(NoteResDto, HttpStatus.OK)
  findAllByUserId(@Req() req: Request) {
    const userId = req.user!['id'] as number
    return this.notesService.findAllByUserId(userId)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a note by ID',
  })
  @ApiStandardResponse([NoteResDto], HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a note by ID',
  })
  @ApiStandardResponse(Boolean, HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(id, updateNoteDto)
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a note by ID',
  })
  @ApiStandardResponse(Boolean, HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.remove(id)
  }
}
