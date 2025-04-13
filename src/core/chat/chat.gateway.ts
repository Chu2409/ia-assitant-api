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
import { OpenRouterService } from '../ia/ia.service'
import { WsAuth } from '../auth/decorators/auth.decorator'

@WebSocketGateway({ cors: true })
@Injectable()
@WsAuth()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server
  private readonly logger = new Logger(ChatGateway.name)

  constructor(private readonly openRouterService: OpenRouterService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage('chat_message')
  async handleMessage(
    client: Socket,
    payload: { prompt: string; context: any[]; model: string },
  ) {
    const { prompt, context, model } = payload

    try {
      const reply = await this.openRouterService.chat({
        prompt,
        context,
        model,
      })

      // Emitir la respuesta al cliente
      client.emit('chat_response', { content: reply })
    } catch (error) {
      this.logger.error('Error in chat', error)
      client.emit('chat_error', { error: 'Error al procesar la solicitud' })
    }
  }
}
