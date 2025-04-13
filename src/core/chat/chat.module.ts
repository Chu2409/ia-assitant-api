import { Module } from '@nestjs/common'
import { ChatController } from './chat.controller'
import { IaModule } from '../ia/ia.module'
import { ChatGateway } from './chat.gateway'
import { ChatService } from './chat.service'

@Module({
  controllers: [ChatController],
  imports: [IaModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
