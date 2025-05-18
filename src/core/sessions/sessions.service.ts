import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { CreateSessionDto } from './dto/req/create-session.dto'
import { UpdateSessionDto } from './dto/req/update-session.dto'

@Injectable()
export class SessionsService {
  constructor(private readonly prismaService: PrismaService) {}

  // private whereClause = (search?: string): Prisma.SessionWhereInput => ({
  //   ...(search && {
  //     OR: [
  //       {
  //         title: {
  //           contains: search,
  //           mode: 'insensitive',
  //         },
  //       },
  //     ],
  //   }),
  // })

  private include: Prisma.SelectSubset<
    Prisma.SessionInclude,
    Prisma.SessionInclude
  > = {
    messages: {
      omit: {
        sessionId: true,
      },
    },
  }

  async create(userId: number, { title }: CreateSessionDto) {
    const entity = await this.prismaService.session.create({
      data: {
        title,
        userId,
      },
    })

    return !!entity
  }

  // async findAll({ limit, page, search }: SessionFiltersDto) {
  //   const whereClause: Prisma.SessionWhereInput = {
  //     ...this.whereClause(search),
  //   }

  //   const [entities, total] = await Promise.all([
  //     this.prismaService.session.findMany({
  //       take: limit,
  //       skip: (page - 1) * limit,
  //       where: whereClause,
  //       orderBy: {
  //         id: 'desc',
  //       },
  //     }),
  //     this.prismaService.session.count({
  //       where: whereClause,
  //     }),
  //   ])

  //   return {
  //     records: entities,
  //     total,
  //     limit,
  //     page,
  //     pages: Math.ceil(total / limit),
  //   }
  // }

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

    const entity = await this.prismaService.session.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    })

    return !!entity
  }

  async remove(id: number) {
    await this.findOne(id)

    const deleted = await this.prismaService.session.delete({
      where: {
        id,
      },
    })

    return !!deleted
  }
}
