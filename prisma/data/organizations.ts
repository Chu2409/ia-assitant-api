import { Prisma } from '@prisma/client'

export const organizations: Prisma.OrganizationCreateManyInput[] = [
  {
    name: 'Test Organization',
    domain: 'test.org',
  },
  {
    name: 'Test Organization 2',
    domain: 'test2.org',
  },
]
