import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect('Xin chào! Đây là API của SysTool Backend! 🚀');
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe('OK');
        expect(res.body.timestamp).toBeDefined();
      });
  });

  it('/echo (POST)', () => {
    const testData = { message: 'Hello World' };
    return request(app.getHttpServer())
      .post('/api/echo')
      .send(testData)
      .expect(201)
      .expect((res) => {
        expect(res.body.message).toBe('Echo response');
        expect(res.body.data).toEqual(testData);
        expect(res.body.timestamp).toBeDefined();
      });
  });

  it('/users/:id (GET) - valid user', () => {
    return request(app.getHttpServer())
      .get('/api/users/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe('1');
        expect(res.body.name).toBe('Nguyễn Văn A');
        expect(res.body.email).toBe('nguyenvana@example.com');
      });
  });

  it('/users/:id (GET) - invalid user', () => {
    return request(app.getHttpServer())
      .get('/api/users/999')
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe('999');
        expect(res.body.name).toBe('Không tìm thấy');
        expect(res.body.email).toBe('N/A');
      });
  });
});
