import { Logger } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { organizations } from './data/organizations'
import { users } from './data/user'
import { admins } from './data/admins'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.organization.createMany({
    data: organizations,
  })

  await prisma.user.createMany({
    data: users,
  })

  await prisma.admin.createMany({
    data: admins,
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
