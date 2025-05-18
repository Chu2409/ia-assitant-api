import { Module } from '@nestjs/common'
import { IaModule } from '../ia/ia.module'
import { ChatGateway } from './chat.gateway'
import { ChatService } from './chat.service'
import { ChatsController } from './chat.controller'

@Module({
  imports: [IaModule],
  controllers: [ChatsController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
