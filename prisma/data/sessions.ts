import { Prisma } from '@prisma/client'

export const sessions: Prisma.SessionCreateManyInput[] = [
  {
    title: 'Que es React?',
    userId: 1,
  },
  {
    title: 'Que es NestJS?',
    userId: 1,
  },
]
