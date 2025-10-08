# SysTool Monorepo

Monorepo sử dụng Yarn Workspaces với 3 packages chính:

## Cấu trúc dự án

```
packages/
├── backend/     # Backend API server
├── frontend/    # Frontend application
└── shared/      # Shared types và utilities
```

## Cài đặt

```bash
yarn install
```

## Scripts

- `yarn dev` - Chạy tất cả packages ở chế độ development
- `yarn build` - Build tất cả packages
- `yarn test` - Chạy test cho tất cả packages
- `yarn lint` - Lint tất cả packages

## Development

Mỗi package có thể chạy độc lập:

```bash
# Backend
cd packages/backend
yarn dev

# Frontend
cd packages/frontend
yarn dev

# Shared
cd packages/shared
yarn dev
```
