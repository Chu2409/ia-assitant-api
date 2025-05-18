import { UserRole } from '@prisma/client'

export interface IJwtPayload {
  id: number
  role: UserRole
}
