import { Injectable, NotFoundException } from '@nestjs/common';
import { LanguagePublicService } from '@/museum/language/language-public.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '@/museum/item/item.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly languagePublicService: LanguagePublicService,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly httpService: HttpService,
  ) {}

  async getSystemPrompt(language: string) {
    return this.generateSystemPrompt(language);
  }

  async generateSystemPrompt(language: string) {
    const languages = await this.languagePublicService.getLanguages();
    const systemPrompt = languages.find(
      _language =>
        _language.country === language && _language.code === 'SYSTEM_PROMPT',
    );
    if (!systemPrompt) {
      throw new NotFoundException('Language not found');
    }
    return this.convertContentToLanguage(systemPrompt.value, language);
  }

  async convertContentToLanguage(
    content: string,
    language: string,
    languageMapped?: Awaited<
      ReturnType<typeof this.languagePublicService.getLanguageMapped>
    >,
  ): Promise<string> {
    if (!languageMapped) {
      languageMapped = await this.languagePublicService.getLanguageMapped();
    }

    const replacePlaceholders = (str: string): string => {
      return str.replace(/{{(.+?)}}/g, (match, code) => {
        const replacement = languageMapped[language]?.[code];
        if (replacement && /{{(.+?)}}/.test(replacement)) {
          // The replacement itself contains more placeholders, so recurse
          return replacePlaceholders(replacement);
        }
        return replacement ?? match;
      });
    };

    return replacePlaceholders(content);
  }

  async generateSystemContext(_language: string) {
    const items = await this.itemRepository.find({
      relations: ['assets', 'category'],
    });
    return await Promise.all(
      items.map(async item => ({
        name: await this.convertContentToLanguage(item.name, _language),
        description: await this.convertContentToLanguage(
          item.description,
          _language,
        ),
        category: {
          name: await this.convertContentToLanguage(
            item.category.name,
            _language,
          ),
          description: await this.convertContentToLanguage(
            item.category.description,
            _language,
          ),
        },
        assets: await Promise.all(
          item.assets.map(async asset => ({
            name: await this.convertContentToLanguage(asset.name, _language),
            description: await this.convertContentToLanguage(
              asset.description,
              _language,
            ),
          })),
        ),
      })),
    );
  }

  async prompt(language: string, context: string) {
    const systemPrompt = await this.generateSystemPrompt(language);
    const systemContext = await this.generateSystemContext(language);
    let _systemPrompt: string;
    try {
      const jsonSystemPrompt = JSON.parse(systemPrompt);
      if (!jsonSystemPrompt.context) {
        jsonSystemPrompt.context = systemContext;
      } else {
        jsonSystemPrompt.context = {
          ...jsonSystemPrompt.context,
          ...systemContext,
        };
      }
      _systemPrompt = JSON.stringify(jsonSystemPrompt);
    } catch (error) {
      _systemPrompt = `
        ${systemPrompt}
        ${JSON.stringify(systemContext)}
        `;
    }
    const response = this.httpService.post(
      '/api/generate',
      {
        model: 'qwen2.5:7b',
        system: _systemPrompt,
        prompt: context,
        stream: true,
      },
      {
        responseType: 'stream',
      },
    );
    return await firstValueFrom(response);
  }
}
