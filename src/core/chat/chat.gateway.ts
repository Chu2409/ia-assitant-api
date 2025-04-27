// src/chat/chat.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Injectable, Logger } from '@nestjs/common'
import { ChatService } from './chat.service'

@WebSocketGateway({ cors: true })
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server
  private readonly logger = new Logger(ChatGateway.name)

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    const token = client.handshake.query.token
    if (!token) {
      client.emit('unathorized', { error: 'No token provided' })
      client.disconnect() // Desconecta si no hay token
    }
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage('chat_message')
  async handleMessage(
    client: Socket,
    payload: {
      userId: number
      prompt: string
      sessionId?: number
      model?: string
    },
  ) {
    const { userId, prompt, sessionId, model } = payload

    try {
      const { reply, sessionId: newSessionId } =
        await this.chatService.handlePrompt({
          prompt,
          userId,
          sessionId,
          model,
        })

      client.emit('chat_response', {
        sessionId: newSessionId,
        content: reply,
      })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      this.logger.error('Error in chat')
      client.emit('chat_error', { error: 'Error al procesar la solicitud' })
    }
  }
}
