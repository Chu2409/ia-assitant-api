import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { OpenRouterResponse } from './intefaces/open-router-response'
import { lastValueFrom } from 'rxjs'
import { ChatReqDto } from './dto/chat-req.dto'

@Injectable()
export class OpenRouterService {
  constructor(private readonly httpService: HttpService) {}

  async chat({ prompt, context, model }: ChatReqDto) {
    const messages = [...context, { role: 'user', content: prompt }]

    const response = await lastValueFrom(
      this.httpService.post<OpenRouterResponse>('', {
        model,
        messages,
      }),
    )

    return response.data.choices[0].message.content
  }
}
