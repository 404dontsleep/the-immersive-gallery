/**
 * Color System
 *
 * Hệ thống màu sắc tập trung cho toàn bộ ứng dụng XR
 * Sử dụng các biến này để đảm bảo tính nhất quán
 */

export const colors = {
  // Primary Colors - Màu chính
  primary: {
    main: '#1890ff',
    dark: '#096dd9',
    light: '#40a9ff',
    lighter: '#69c0ff',
    bg: '#f0f7ff',
  },

  // Purple Gradient - Màu tím gradient (cho hero section)
  purple: {
    light: '#667eea',
    dark: '#764ba2',
  },

  // Background Colors - Màu nền
  background: {
    white: '#ffffff',
    light: '#f9fafb',
    lightGray: '#f0f0f0',
    dark: '#1a1a1a',
    black: '#000000',
  },

  // Text Colors - Màu chữ
  text: {
    primary: '#1a1a1a',
    secondary: '#333333',
    tertiary: '#666666',
    quaternary: '#999999',
    white: '#ffffff',
  },

  // Border Colors - Màu viền
  border: {
    light: '#f0f0f0',
    main: '#e0e0e0',
    dark: '#d9d9d9',
  },

  // Status Colors - Màu trạng thái
  status: {
    error: '#ff4d4f',
    success: '#52c41a',
    warning: '#faad14',
    info: '#1890ff',
  },

  // Overlay Colors - Màu overlay/backdrop
  overlay: {
    dark: 'rgba(0, 0, 0, 0.7)',
    darker: 'rgba(0, 0, 0, 0.9)',
    light: 'rgba(255, 255, 255, 0.9)',
    lighter: 'rgba(255, 255, 255, 0.95)',
  },

  // Shadow Colors - Màu đổ bóng
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    main: 'rgba(0, 0, 0, 0.15)',
    dark: 'rgba(0, 0, 0, 0.2)',
    darker: 'rgba(0, 0, 0, 0.3)',
  },
} as const;

// CSS Variables mapping
export const cssVariables = {
  // Primary
  '--color-primary': colors.primary.main,
  '--color-primary-dark': colors.primary.dark,
  '--color-primary-light': colors.primary.light,
  '--color-primary-lighter': colors.primary.lighter,
  '--color-primary-bg': colors.primary.bg,

  // Purple
  '--color-purple-light': colors.purple.light,
  '--color-purple-dark': colors.purple.dark,

  // Background
  '--color-bg-white': colors.background.white,
  '--color-bg-light': colors.background.light,
  '--color-bg-light-gray': colors.background.lightGray,
  '--color-bg-dark': colors.background.dark,
  '--color-bg-black': colors.background.black,

  // Text
  '--color-text-primary': colors.text.primary,
  '--color-text-secondary': colors.text.secondary,
  '--color-text-tertiary': colors.text.tertiary,
  '--color-text-quaternary': colors.text.quaternary,
  '--color-text-white': colors.text.white,

  // Border
  '--color-border-light': colors.border.light,
  '--color-border-main': colors.border.main,
  '--color-border-dark': colors.border.dark,

  // Status
  '--color-error': colors.status.error,
  '--color-success': colors.status.success,
  '--color-warning': colors.status.warning,
  '--color-info': colors.status.info,
} as const;

// Gradient definitions
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
  purple: `linear-gradient(135deg, ${colors.purple.light} 0%, ${colors.purple.dark} 100%)`,
  purpleWhite: `linear-gradient(135deg, ${colors.text.white} 0%, #f0f0f0 100%)`,
} as const;

// Export type for better TypeScript support
export type ColorSystem = typeof colors;
export type CSSVariables = typeof cssVariables;
export type Gradients = typeof gradients;
