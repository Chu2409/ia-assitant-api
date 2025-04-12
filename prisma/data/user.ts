import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const encryptPassword = (password: string) => {
  return bcrypt.hashSync(password, 12)
}

export const users: Prisma.UserCreateManyInput[] = [
  {
    name: 'Juan',
    lastName: 'Gonzalez',
    email: 'jgonzales@test.org',
    password: encryptPassword('123456'),
    organizationId: 1,
  },
  {
    name: 'John',
    lastName: 'Doe',
    email: 'jdoe@test2.org',
    password: encryptPassword('123456'),
    organizationId: 2,
  },
]
