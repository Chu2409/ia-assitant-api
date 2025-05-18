import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { OpenRouterService } from '../ia/ia.service'
import { MessageRole } from '@prisma/client'
import { MessagePayloadDto } from './dto/req/message-payload.dto'
import { MesssageResDto } from './dto/res/message-res.dto'
import { IContext } from '../ia/types/open-router-request'
import { SimplePromptReqDto } from './dto/req/simple-prompt.dto'

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private ai: OpenRouterService,
  ) {}

  async handlePrompt({
    userId,
    prompt,
    sessionId,
  }: MessagePayloadDto): Promise<MesssageResDto> {
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
        role: MessageRole.user,
        content: prompt,
      },
    })

    // 3. Obtener contexto reciente
    const messages = await this.prisma.message.findMany({
      where: { sessionId: session!.id },
      orderBy: { createdAt: 'asc' },
      take: 20,
    })

    // 4. Llamar a OpenRouter
    const formatted = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }))

    const reply = await this.ai.chat({ context: formatted })

    if (!sessionId) {
      const title = await this.ai.getTitle({
        context: formatted,
      })

      await this.prisma.session.update({
        where: { id: session!.id },
        data: { title },
      })
    }

    // 5. Guardar respuesta de la IA
    await this.prisma.message.create({
      data: {
        sessionId: session!.id,
        role: MessageRole.assistant,
        content: reply,
      },
    })

    return { sessionId: session!.id, content: reply }
  }

  async handleSimplePrompt({ prompt }: SimplePromptReqDto) {
    const formatted: IContext[] = [
      {
        content: prompt,
        role: MessageRole.user,
      },
    ]

    const reply = await this.ai.chat({ context: formatted })

    return {
      reply,
    }
  }
}
