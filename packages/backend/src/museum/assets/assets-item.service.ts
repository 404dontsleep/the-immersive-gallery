import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import createBaseService from '@/base/base.service';
import { AssetsItem, AssetsItemType } from './assets-item.entity';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { REDIS_CLIENT } from '@/database/redis/redis.module';
import Redis from 'ioredis';
import * as crypto from 'crypto';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const access = promisify(fs.access);

@Injectable()
export class AssetsItemService extends createBaseService(AssetsItem) {
  private readonly uploadsDir = path.join(process.cwd(), 'uploads', 'assets');

  constructor(
    @InjectDataSource()
    dataSource: DataSource,
    @InjectRepository(AssetsItem)
    repository: Repository<AssetsItem>,
    @Inject(REDIS_CLIENT) readonly redis: Redis,
  ) {
    super(dataSource, repository, redis);
    this.ensureUploadsDir();
  }

  private async ensureUploadsDir() {
    try {
      await access(this.uploadsDir);
    } catch {
      await mkdir(this.uploadsDir, { recursive: true });
    }
  }

  private getFileType(filename: string): AssetsItemType {
    const ext = path.extname(filename).toLowerCase();
    const imageExts = [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
      '.svg',
      '.bmp',
    ];
    const videoExts = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv'];
    const audioExts = ['.mp3', '.wav', '.ogg', '.aac', '.flac', '.m4a'];
    const documentExts = ['.pdf', '.doc', '.docx', '.txt', '.rtf', '.odt'];
    const modelExts = ['.glb', '.gltf', '.obj', '.fbx', '.dae', '.3ds'];

    if (imageExts.includes(ext)) return AssetsItemType.IMAGE;
    if (videoExts.includes(ext)) return AssetsItemType.VIDEO;
    if (audioExts.includes(ext)) return AssetsItemType.AUDIO;
    if (documentExts.includes(ext)) return AssetsItemType.DOCUMENT;
    if (modelExts.includes(ext)) return AssetsItemType.MODEL;

    return AssetsItemType.DOCUMENT; // default
  }

  private generateFilename(originalName: string): string {
    const timestamp = Date.now();
    const sha = crypto.createHash('sha256').update(originalName).digest('hex');
    return `${timestamp}-${sha}`;
  }

  async uploadFile(
    file: { originalname: string; buffer: Buffer },
    name: string,
    description: string,
    parentId?: number,
  ): Promise<AssetsItem> {
    await this.ensureUploadsDir();

    const originalName = file.originalname;
    const filename = this.generateFilename(originalName);
    const filePath = path.join(this.uploadsDir, filename);

    await writeFile(filePath, file.buffer);

    const type = this.getFileType(originalName);
    const url = `/uploads/assets/${filename}`;

    const assetsItem = await this.create({
      url,
      type,
      name,
      description,
      parentId: parentId ?? null,
    });

    return assetsItem;
  }

  async getFileStream(id: number): Promise<Readable> {
    const assetsItem = await this.findById(id);
    if (!assetsItem) {
      throw new NotFoundException('Assets item not found');
    }

    const filePath = path.join(
      process.cwd(),
      assetsItem.url.replace(/^\//, ''),
    );

    try {
      await access(filePath);
    } catch {
      throw new NotFoundException('File not found');
    }

    return createReadStream(filePath);
  }

  async getFileInfo(id: number): Promise<{ path: string; mimeType: string }> {
    const assetsItem = await this.findById(id);
    if (!assetsItem) {
      throw new NotFoundException('Assets item not found');
    }

    const filePath = path.join(
      process.cwd(),
      assetsItem.url.replace(/^\//, ''),
    );

    try {
      await access(filePath);
    } catch {
      throw new NotFoundException('File not found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.mp4': 'video/mp4',
      '.avi': 'video/x-msvideo',
      '.mov': 'video/quicktime',
      '.webm': 'video/webm',
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
      '.ogg': 'audio/ogg',
      '.pdf': 'application/pdf',
      '.txt': 'text/plain',
      '.glb': 'model/gltf-binary',
      '.gltf': 'model/gltf+json',
    };

    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    return { path: filePath, mimeType };
  }
}
