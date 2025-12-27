import { AssetsItem, AssetsItemType } from './assets-item.entity';
import { AssetsItemService } from './assets-item.service';
import {
  Controller,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PermissionGuard } from '@/permission/guards/permission.guard';
import {
  RegisterPermission,
  RegisterPermissionMethod,
  RequirePermission,
  DefaultPermissionName,
} from '@/permission/decorators';
import createBaseController from '@/base/base.controller';
import { AssetsItemDto, CreateFolderDto } from './assets-item.dto';

@Controller('assets-items')
@ApiTags('assets-items')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RegisterPermission({
  name: 'AssetsItemController',
  description: 'Assets item management',
})
export class AssetsItemController extends createBaseController(
  AssetsItem,
  AssetsItemDto,
  {
    create: false,
  },
) {
  constructor(readonly assetsItemService: AssetsItemService) {
    super(assetsItemService);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        parentId: {
          type: 'number',
        },
      },
    },
  })
  @RegisterPermissionMethod({
    name: DefaultPermissionName.Create,
    description: 'Upload assets item',
  })
  @RequirePermission(DefaultPermissionName.Create)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('parentId') parentId?: number,
  ): Promise<AssetsItem> {
    return this.assetsItemService.uploadFile(file, name, description, parentId);
  }

  @Post('create-folder')
  @ApiBody({
    type: CreateFolderDto,
  })
  @RegisterPermissionMethod({
    name: DefaultPermissionName.Create,
    description: 'Create new assets folder',
  })
  @RequirePermission(DefaultPermissionName.Create)
  async createFolder(@Body() data: CreateFolderDto): Promise<AssetsItem> {
    return this.assetsItemService.create({
      ...data,
      type: AssetsItemType.FOLDER,
      url: '', // Folder không cần url
    });
  }
}
