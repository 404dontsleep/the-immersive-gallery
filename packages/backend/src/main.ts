import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import generate from 'orval';
import { ValidationPipe } from '@nestjs/common';
import { ValidationInterceptor } from './utils/validation.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Bật CORS
  app.enableCors();

  // Global prefix cho API
  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new ValidationInterceptor());

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('SysTool API')
    .setDescription('API documentation cho SysTool backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Ứng dụng đang chạy tại: http://localhost:${port}`);
  console.log(`📚 API docs: http://localhost:${port}/docs`);
  console.log(`🔗 API base: http://localhost:${port}/api`);
  generateApiTs();
}

async function generateApiTs() {
  await generate({
    input: 'http://localhost:3000/docs-json',
    output: {
      mode: 'single',
      target: __dirname + '/../../../shared/api.ts',
      client: 'swr',
      httpClient: 'axios',
      override: {
        mutator: {
          path: __dirname + '/../../../shared/mutator.ts',
          name: 'customInstance',
        },
      },
      prettier: true,
    },
  });
}

bootstrap();
