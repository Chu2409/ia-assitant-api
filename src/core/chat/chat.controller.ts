import { Controller, Post, HttpStatus, Body } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { ApiStandardResponse } from 'src/common/decorators/api-standard-response.decorator'
import { ChatService } from './chat.service'
import { SimplePromptReqDto } from './dto/req/simple-prompt.dto'
import { SimpleMessageResDto } from './dto/res/simple-message.dto'
import { Auth } from '../auth/decorators/auth.decorator'

@Controller('chats')
@ApiBearerAuth()
@Auth()
export class ChatsController {
  constructor(private readonly service: ChatService) {}

  @Post('simple-prompt')
  @ApiOperation({
    summary: 'Ask a simple question to the AI',
  })
  @ApiStandardResponse(SimpleMessageResDto, HttpStatus.CREATED)
  simplePrompt(@Body() dto: SimplePromptReqDto) {
    return this.service.handleSimplePrompt(dto)
  }
}
