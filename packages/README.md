# Hướng dẫn chạy dự án

## 1. Cấu hình & khởi động các dịch vụ bằng Docker

### Cấu hình `.env` cho Docker

Tạo file `.env` trong thư mục `docker` (hoặc kiểm tra file có sẵn) với các biến cấu hình sau.
**Lưu ý:** Đổi các thông tin nhạy cảm, ví dụ PASSWORD, USER, EMAIL,... tương ứng với môi trường của bạn, KHÔNG dùng giá trị mặc định production.

```env
# NGINX Proxy Manager
NGINX_HTTP_PORT=80
NGINX_ADMIN_PORT=81
NGINX_HTTPS_PORT=443
NGINX_DATA_PATH=./nginx/data
LETSENCRYPT_PATH=./nginx/letsencrypt

# Postgres
POSTGRES_USER=your_pg_user         # ví dụ: admin
POSTGRES_PASSWORD=your_pg_password # ví dụ: mạnh và khó đoán
POSTGRES_DB=your_pg_db             # ví dụ: the-immersive-gallery
POSTGRES_PORT=5432
POSTGRES_DATA_PATH=./postgres/data
INIT_SCRIPTS_PATH=./init-scripts

# PgAdmin
PGADMIN_DEFAULT_EMAIL=your@email.com      # ví dụ: bạn tự đặt
PGADMIN_DEFAULT_PASSWORD=your_pgadmin_pw  # ví dụ: mật khẩu mạnh
PGADMIN_PORT=5050

# Redis
REDIS_PORT=6379
REDIS_DATA_PATH=./redis/data
```

> **Khuyến nghị:** KHÔNG commit file `.env` lên repository.  
> **Ghi chú:** Có thể đổi các giá trị khác cho phù hợp nhu cầu.

### Khởi động dịch vụ

```bash
cd docker
docker compose up -d
```

---

## 2. Cấu hình & khởi động backend

### Cấu hình file `.env` cho backend

Tạo file `.env` trong thư mục `backend` (hoặc kiểm tra file có sẵn) với các biến cấu hình ví dụ bên dưới.  
**Lưu ý:** Hãy chắc chắn thay đổi các thông tin nhạy cảm như password, secret, key,... cho phù hợp với môi trường của bạn, KHÔNG dùng giá trị mặc định để chạy production.

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

DB_HOST=localhost                     # địa chỉ host Postgres (có thể là service name trong docker, ví dụ 'postgres')
DB_PORT=5432
DB_USERNAME=your_pg_user              # trùng với giá trị bạn đã set ở docker/.env
DB_PASSWORD=your_pg_password          # trùng với giá trị bạn đã set ở docker/.env
DB_NAME=your_pg_db                    # trùng với giá trị bạn đã set ở docker/.env

REDIS_HOST=localhost                  # hoặc là service name của redis trong docker (ví dụ: redis)
REDIS_PORT=6379

JWT_SECRET=your_jwt_secret            # tạo chuỗi ngẫu nhiên, KHÔNG dùng giá trị mặc định
DB_ENCRYPT_SECRET=your_db_encrypt_secret   # tạo chuỗi ngẫu nhiên, KHÔNG dùng giá trị mặc định

GEMINI_KEY=your_google_gemini_key     # nếu dùng Gemini API (Google), nhập key tại đây

CHATBOT_API_URL=http://localhost:11434   # endpoint của API dịch vụ chatbot (tuỳ chỉnh nếu có)
```

> **Ghi chú:** Các thông tin `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME` phải trùng với cấu hình bên trong Docker.
> **KHÔNG commit file `.env` này lên repository.**

### Khởi động backend

```bash
cd ../backend
yarn
yarn dev
```

**Lưu ý:** Sau khi khởi động backend lần đầu, hãy dừng lại (`Ctrl+C` trên terminal), thực hiện lệnh seed, sau đó khởi động lại backend.

#### Seed database

```bash
yarn seed
```

Sau khi seed xong:

```bash
yarn dev
```

---

## 3. Khởi động frontend

```bash
cd ../frontend
yarn
yarn dev
```

**Dự án sẽ chạy trên các cổng mặc định do frontend/backend config (thường là 5173 cho frontend, 3000 cho backend)**
