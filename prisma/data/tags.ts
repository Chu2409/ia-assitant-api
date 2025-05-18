import { Prisma } from '@prisma/client'

export const tags: Prisma.TagCreateManyInput[] = [
  {
    name: 'NestJS',
    userId: 3,
  },
  {
    name: 'Prisma',
    userId: 3,
  },
  {
    name: 'TypeScript',
    userId: 3,
  },
]
