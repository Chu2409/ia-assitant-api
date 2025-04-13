import { Controller, Post, Body } from '@nestjs/common'
import { OpenRouterService } from '../ia/ia.service'
import { ChatReqDto } from '../ia/dto/chat-req.dto'

@Controller('chat')
export class ChatController {
  constructor(private readonly aiService: OpenRouterService) {}

  @Post()
  async chat(@Body() body: ChatReqDto) {
    return await this.aiService.chat(body)
  }
}
