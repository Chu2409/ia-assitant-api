import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { OpenRouterService } from '../ia/ia.service'
import { MessageRole } from '@prisma/client'

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private ai: OpenRouterService,
  ) {}

  async handlePrompt(
    userId: number,
    prompt: string,
    model: string,
    sessionId?: number,
  ) {
    // 1. Obtener o crear sesión
    const session = sessionId
      ? await this.prisma.session.findUnique({ where: { id: sessionId } })
      : await this.prisma.session.create({
          data: { userId, title: '' },
        })

    // 2. Guardar mensaje del usuario
    await this.prisma.message.create({
      data: {
        sessionId: session!.id,
        role: MessageRole.USER,
        content: prompt,
      },
    })

    // 3. Obtener contexto reciente
    const messages = await this.prisma.message.findMany({
      where: { sessionId: session?.id },
      orderBy: { createdAt: 'asc' },
      take: 20,
    })

    // 4. Llamar a OpenRouter
    const formatted = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }))

    const reply = await this.ai.chat({ prompt, context: formatted, model })

    // 5. Guardar respuesta de la IA
    await this.prisma.message.create({
      data: {
        sessionId: session!.id,
        role: MessageRole.ASSISTANT,
        content: reply,
      },
    })

    return { sessionId: session?.id, reply }
  }
}
