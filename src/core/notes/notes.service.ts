import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateNoteReqDto } from './dto/req/create-note.dto'
import { UpdateNoteDto } from './dto/req/update-note.dto'
import { PrismaService } from 'src/global/prisma/prisma.service'

@Injectable()
export class NotesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, createNoteDto: CreateNoteReqDto) {
    const { title, content, tagsIds } = createNoteDto

    const note = await this.prismaService.note.create({
      data: {
        title,
        content,
        userId,
      },
    })

    if (tagsIds && tagsIds.length > 0) {
      await this.prismaService.noteTag.createMany({
        data: tagsIds.map((tagId) => ({
          noteId: note.id,
          tagId,
        })),
        skipDuplicates: true,
      })
    }

    return !!note
  }

  async findAllByUserId(userId: number) {
    const notes = await this.prismaService.note.findMany({
      include: {
        tags: {
          include: {
            tag: {
              omit: {
                userId: true,
              },
            },
          },
          omit: {
            noteId: true,
            tagId: true,
          },
        },
      },
      omit: {
        userId: true,
      },
      where: {
        userId,
      },
    })

    // Formatear la respuesta para incluir solo los tags
    const formattedNotes = notes.map((note) => ({
      ...note,
      tags: note.tags.map((tagRelation) => tagRelation.tag),
    }))
    return formattedNotes
  }

  async findOne(id: number) {
    const note = await this.prismaService.note.findUnique({
      include: {
        tags: {
          include: {
            tag: {
              omit: {
                userId: true,
              },
            },
          },
          omit: {
            noteId: true,
            tagId: true,
          },
        },
      },
      omit: {
        userId: true,
      },
      where: {
        id,
      },
    })

    if (!note) {
      throw new NotFoundException('Note not found')
    }

    const formattedNote = {
      ...note,
      tags: note?.tags.map((tagRelation) => tagRelation.tag),
    }
    return formattedNote
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    await this.findOne(id)

    return this.prismaService.$transaction(async (prisma) => {
      // Actualiza la nota
      const note = await prisma.note.update({
        where: { id },
        data: {
          title: updateNoteDto.title,
          content: updateNoteDto.content,
          updatedAt: new Date(),
        },
      })

      // Manejo de tags solo si se proporcionaron
      if (updateNoteDto.tagsIds !== undefined) {
        // Elimina relaciones existentes
        await prisma.noteTag.deleteMany({
          where: { noteId: id },
        })

        // Crea nuevas relaciones si hay tags
        if (updateNoteDto.tagsIds.length > 0) {
          await prisma.noteTag.createMany({
            data: updateNoteDto.tagsIds.map((tagId) => ({
              noteId: id,
              tagId,
            })),
            skipDuplicates: true,
          })
        }
      }

      return !!note
    })
  }

  async remove(id: number) {
    await this.findOne(id)

    const deleted = await this.prismaService.note.delete({
      where: {
        id,
      },
    })

    return !!deleted
  }
}
