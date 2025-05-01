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
import { ApiRes } from 'src/common/types/api-response.interface'
import { MessagePayloadDto } from './dto/req/message-payload.dto'
import { MesssageResDto } from './dto/res/message-res.dto'
import { JwtService } from '@nestjs/jwt'

@WebSocketGateway({ cors: true })
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server
  private readonly logger = new Logger(ChatGateway.name)

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.query.token as string
      if (!token) {
        throw new Error('MISSING_TOKEN')
      }

      await this.authenticateToken(token)

      this.logger.log(`Client connected: ${client.id}`)
      this.logger.debug(
        `Authenticated user with token: ${token.substring(0, 5)}...`,
      )
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.handleConnectionError(client, error)
    }
  }

  private async authenticateToken(token: string): Promise<void> {
    try {
      await this.jwtService.verifyAsync(token) // Usamos verifyAsync para consistencia
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('INVALID_TOKEN')
    }
  }

  private handleConnectionError(client: Socket, error: Error): void {
    const errorResponse: ApiRes<null> = {
      success: false,
      message: {
        content: [this.getErrorMessage(error)],
        displayable: false,
      },
      data: null,
    }

    client.emit('unauthorized', errorResponse)
    client.disconnect(true) // true para cerrar la conexión inmediatamente

    this.logger.warn(`Connection rejected: ${error.message}`)
  }

  private getErrorMessage(error: Error): string {
    switch (error.message) {
      case 'MISSING_TOKEN':
        return 'Token not provided'
      case 'INVALID_TOKEN':
        return 'Token is invalid'
      default:
        return 'Authentication error'
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage('chat_message')
  async handleMessage(
    client: Socket,
    { userId, prompt, sessionId: currentSessionId, model }: MessagePayloadDto,
  ) {
    try {
      const { content, sessionId } = await this.chatService.handlePrompt({
        prompt,
        userId,
        sessionId: currentSessionId,
        model,
      })

      const res: ApiRes<MesssageResDto> = {
        success: true,
        message: {
          content: ['Succesful response'],
          displayable: false,
        },
        data: {
          sessionId,
          content,
        },
      }

      client.emit('chat_response', res)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      this.logger.error('Error in chat')

      const res: ApiRes<null> = {
        success: false,
        message: {
          content: ['Ha ocurrido un error al procesar la respuesta'],
          displayable: true,
        },
        data: null,
      }

      client.emit('chat_error', res)
    }
  }
}
