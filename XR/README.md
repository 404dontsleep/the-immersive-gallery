# 🏛️ XR - The Immersive Gallery (Bảo Tàng D)

Trải nghiệm bảo tàng 3D/XR tương tác với React Three Fiber và WebXR.

## 🚀 Tính năng

- ✨ Trải nghiệm XR/VR tương tác
- 🖼️ Xem và khám phá hiện vật 3D
- 📱 Responsive web interface
- 🎨 UI hiện đại với Ant Design và Tailwind CSS
- 🌐 Đa ngôn ngữ (Tiếng Việt)
- 🎯 Physics simulation với Rapier

## 📦 Tech Stack

- **React 18.2** - UI framework
- **TypeScript** - Type safety
- **React Three Fiber** - 3D rendering
- **@react-three/xr** - WebXR support
- **@react-three/drei** - 3D helpers
- **@react-three/rapier** - Physics engine
- **@react-three/uikit** - 3D UI components
- **Ant Design** - UI components
- **Tailwind CSS** - Styling
- **Wouter** - Routing
- **Zustand** - State management
- **Vite** - Build tool

## 🏗️ Kiến trúc Dự án

Dự án sử dụng **Feature-Based Architecture** để dễ dàng maintain và scale:

```
src/
├── app/              # Application entry point
├── features/         # Feature modules (home, items, museum)
├── shared/           # Shared code (components, hooks, types, etc.)
├── routes/           # Application routing
├── assets/           # Static assets
└── styles/           # Global styles
```

📚 **Xem chi tiết**: [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🛠️ Cài đặt

### Prerequisites

- Node.js >= 18
- Yarn hoặc npm

### Clone và Install

```bash
# Clone repository
git clone <repository-url>

# Di chuyển vào thư mục XR
cd the-immersive-gallery/XR

# Install dependencies
yarn install
# hoặc
npm install
```

## 🚀 Chạy Dự án

### Development

```bash
yarn dev
# hoặc
npm run dev
```

Mở trình duyệt tại: `https://localhost:5173` (HTTPS cho XR support)

### Build

```bash
yarn build
# hoặc
npm run build
```

### Preview

```bash
yarn preview
# hoặc
npm run preview
```

## 📁 Cấu trúc Chính

### Features

#### 🏠 Home (`features/home/`)

- Trang chủ với giới thiệu
- Landing page

#### 🖼️ Items (`features/items/`)

- Quản lý và hiển thị hiện vật
- 3D item viewer
- Item list và search

#### 🏛️ Museum (`features/museum/`)

- Trải nghiệm 3D museum
- XR/VR scene

### Shared

- **Components**: DefaultLayout, 3D components
- **Hooks**: useSplitText, useTheme, useTranslation
- **Providers**: Canvas, XR store
- **Types**: Shared TypeScript types
- **Constants**: Routes, app config
- **Config**: Theme, colors

## 🎯 Path Aliases

```typescript
@/*           → src/*
@app/*        → src/app/*
@features/*   → src/features/*
@shared/*     → src/shared/*
@routes/*     → src/routes/*
```

## 📝 Scripts

```bash
# Development
yarn dev              # Start dev server

# Build
yarn build            # Build for production
yarn preview          # Preview production build

# Linting
yarn lint             # Run ESLint
```

## 🔄 Migration từ Cấu trúc Cũ

Nếu bạn đang có code cũ, xem hướng dẫn migration:

📚 [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)

## 🏗️ Thêm Feature Mới

1. Tạo thư mục feature:

```bash
mkdir -p src/features/my-feature/{components,hooks,services,types}
```

2. Tạo components và logic

3. Export qua `index.ts`:

```typescript
// src/features/my-feature/index.ts
export * from './components';
export * from './hooks';
export * from './types';
```

4. Sử dụng:

```typescript
import { MyComponent } from '@/features/my-feature';
```

## 📚 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Kiến trúc chi tiết
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Hướng dẫn migration

## 🌐 Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ WebXR requires secure context (HTTPS)

## 🎮 XR/VR Support

Dự án hỗ trợ WebXR API:

- Meta Quest
- Oculus devices
- Other WebXR-compatible devices

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

[MIT License](../LICENSE)

## 👥 Team

- **Developer Team** - Initial work

## 🙏 Acknowledgments

- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [React Three Drei](https://github.com/pmndrs/drei)
- [React Three XR](https://github.com/pmndrs/react-xr)
- [Ant Design](https://ant.design/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ by the team
