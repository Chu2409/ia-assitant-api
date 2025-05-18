import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { CreateTagReqDto } from './dto/req/create-tag.dto'
import { UpdateTagReqDto } from './dto/req/update-tag.dto'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'

@Injectable()
export class TagsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, { name, color }: CreateTagReqDto) {
    const userExists = await this.prismaService.user.findUnique({
      where: { id: userId },
    })
    if (!userExists) {
      throw new NotFoundException('User not found')
    }

    const alreadyExists = await this.prismaService.tag.findFirst({
      where: {
        name,
        userId,
      },
    })
    if (alreadyExists) {
      throw new DisplayableException(
        'La etiqueta ya existe',
        HttpStatus.BAD_REQUEST,
      )
    }

    const tag = await this.prismaService.tag.create({
      data: {
        name,
        userId,
        color,
      },
    })

    return !!tag
  }

  async update(id: number, userId: number, { name, color }: UpdateTagReqDto) {
    const tag = await this.prismaService.tag.findUnique({
      where: { id },
    })
    if (!tag) {
      throw new NotFoundException('Tag not found')
    }

    const userExists = await this.prismaService.user.findUnique({
      where: { id: userId },
    })
    if (!userExists) {
      throw new NotFoundException('User not found')
    }

    const alreadyExists = await this.prismaService.tag.findFirst({
      where: {
        name,
        userId,
        id: {
          not: id,
        },
      },
    })

    if (alreadyExists) {
      throw new DisplayableException(
        'Ya existe una etiqueta con ese nombre',
        HttpStatus.BAD_REQUEST,
      )
    }

    const updatedTag = await this.prismaService.tag.update({
      where: { id },
      data: {
        name,
        color,
      },
    })

    return !!updatedTag
  }

  findAllByUserId(userId: number) {
    return this.prismaService.tag.findMany({
      where: {
        userId,
      },
      omit: {
        userId: true,
      },
    })
  }

  async remove(id: number) {
    const tag = await this.prismaService.tag.findUnique({
      where: { id },
    })
    if (!tag) {
      throw new NotFoundException('Tag not found')
    }

    const deletedTag = await this.prismaService.tag.delete({
      where: { id },
    })

    return !!deletedTag
  }
}
