import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Response } from 'express';

export class PromptRequestDto {
  @ApiProperty({
    description: 'The language of the prompt',
    example: 'en',
  })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({
    description: 'The context of the prompt',
    example: 'Hello, how are you?',
  })
  @IsString()
  @IsNotEmpty()
  context: string;
}

export class PromptResponseDto {
  @ApiProperty({
    description: 'The response of the prompt',
    example: 'Hello, how are you?',
  })
  @IsString()
  @IsNotEmpty()
  response: string;
}

@Controller('chatbot')
@ApiTags('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Get('system-prompt')
  async getSystemPrompt(@Query('language') language: string) {
    return this.chatbotService.generateSystemContext(language);
  }

  @Post('prompt')
  async prompt(@Body() body: PromptRequestDto, @Res() res: Response) {
    const response = await this.chatbotService.prompt(
      body.language,
      body.context,
    );
    res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
  }
}
