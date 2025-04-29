import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { CreateSessionDto } from './dto/create-session.dto'
import { SessionFiltersDto } from './dto/filters.dto'
import { UpdateSessionDto } from './dto/update-session.dto'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'

@Injectable()
export class SessionsService {
  constructor(private readonly prismaService: PrismaService) {}

  private whereClause = (search?: string): Prisma.SessionWhereInput => ({
    OR: [
      {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ],
  })

  include: Prisma.SelectSubset<Prisma.SessionInclude, Prisma.SessionInclude> = {
    messages: true,
  }

  async create({ title, userId }: CreateSessionDto) {
    const entity = await this.prismaService.session.create({
      data: {
        title,
        userId,
      },
    })

    return entity
  }

  async findAll({ limit, page, search }: SessionFiltersDto) {
    const whereClause: Prisma.SessionWhereInput = {
      ...this.whereClause(search),
    }

    const [entities, total] = await Promise.all([
      this.prismaService.session.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: whereClause,
        include: this.include,
        orderBy: {
          id: 'desc',
        },
      }),
      this.prismaService.session.count({
        where: whereClause,
      }),
    ])

    return {
      records: entities,
      total,
      limit,
      page,
      pages: Math.ceil(total / limit),
    }
  }

  async findOne(id: number) {
    const entity = await this.prismaService.session.findUnique({
      where: {
        id,
      },
      include: this.include,
    })

    if (!entity) throw new NotFoundException(`Session with id ${id} not found`)

    return entity
  }

  async update(id: number, dto: UpdateSessionDto) {
    await this.findOne(id)

    const inventory = await this.prismaService.session.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
      include: this.include,
    })

    return inventory
  }

  async remove(id: number) {
    const exists = await this.prismaService.message.findFirst({
      where: {
        sessionId: id,
      },
    })

    if (exists)
      throw new DisplayableException(
        'No se puede eliminar la sesión porque tiene mensajes',
        HttpStatus.BAD_REQUEST,
      )

    return this.prismaService.session.delete({
      where: {
        id,
      },
    })
  }
}
