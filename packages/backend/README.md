# SysTool Backend

Backend API cho dự án SysTool được xây dựng bằng NestJS.

## 🚀 Tính năng

- RESTful API endpoints
- CORS enabled
- Health check endpoint
- User management (mock data)
- Echo endpoint để test

## 📋 Yêu cầu hệ thống

- Node.js >= 18.0.0
- npm hoặc yarn

## 🛠️ Cài đặt

1. Cài đặt dependencies:
```bash
npm install
# hoặc
yarn install
```

2. Tạo file `.env` từ `env.example`:
```bash
cp env.example .env
```

3. Chỉnh sửa file `.env` theo nhu cầu của bạn.

## 🏃‍♂️ Chạy ứng dụng

### Development mode
```bash
npm run start:dev
# hoặc
yarn start:dev
```

### Production mode
```bash
npm run build
npm run start:prod
# hoặc
yarn build
yarn start:prod
```

## 📚 API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/` | Trang chủ |
| GET | `/health` | Kiểm tra trạng thái hệ thống |
| POST | `/echo` | Echo data được gửi |
| GET | `/users/:id` | Lấy thông tin user theo ID |

### Ví dụ sử dụng

#### Health Check
```bash
curl http://localhost:3000/api/health
```

#### Echo Data
```bash
curl -X POST http://localhost:3000/api/echo \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello World"}'
```

#### Get User
```bash
curl http://localhost:3000/api/users/1
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🔧 Scripts có sẵn

- `npm run build` - Build ứng dụng
- `npm run start` - Chạy ứng dụng
- `npm run start:dev` - Chạy với watch mode
- `npm run start:debug` - Chạy với debug mode
- `npm run start:prod` - Chạy production build
- `npm run lint` - Kiểm tra code style
- `npm run format` - Format code với Prettier

## 📁 Cấu trúc thư mục

```
src/
├── app.controller.ts    # Main controller
├── app.service.ts       # Main service
├── app.module.ts        # Root module
└── main.ts             # Entry point
```

## 🌟 Mở rộng

Để thêm tính năng mới:

1. Tạo module mới: `nest g module users`
2. Tạo controller: `nest g controller users`
3. Tạo service: `nest g service users`
4. Import vào `app.module.ts`

## 📝 Ghi chú

- Ứng dụng sử dụng port 3000 mặc định
- CORS được bật để frontend có thể gọi API
- Tất cả API endpoints đều có prefix `/api`
- Health check endpoint có thể được sử dụng cho load balancer

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request
