import { AssetsItemService } from './assets-item.service';
import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('public/assets-items')
@ApiTags('public-assets-items')
export class AssetsItemPublicController {
  constructor(readonly assetsItemService: AssetsItemService) {}

  @Get(':id/stream')
  @ApiParam({ name: 'id', type: Number })
  async streamFile(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<void> {
    const fileInfo = await this.assetsItemService.getFileInfo(id);
    const fileStream = await this.assetsItemService.getFileStream(id);

    res.set({
      'Content-Type': fileInfo.mimeType,
      'Content-Disposition': `inline; filename="${id}"`,
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    });

    fileStream.pipe(res);
  }
}
