import { Logger } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { organizations } from './data/organizations'
import { users } from './data/user'
import { sessions } from './data/sessions'
import { messages } from './data/messages'
import { tags } from './data/tags'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.organization.createMany({
    data: organizations,
  })

  await prisma.user.createMany({
    data: users,
  })

  await prisma.tag.createMany({
    data: tags,
  })

  await prisma.session.createMany({
    data: sessions,
  })

  await prisma.message.createMany({
    data: messages,
  })

  Logger.log('Seed data created successfully')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    Logger.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
