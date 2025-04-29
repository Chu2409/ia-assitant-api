import { MessageRole } from '@prisma/client'

export interface IContext {
  role: MessageRole
  content: string
}
