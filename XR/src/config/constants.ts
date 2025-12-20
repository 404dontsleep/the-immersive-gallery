// Import colors and theme from centralized system
// For detailed color system, see colors.ts, theme.ts and COLORS_GUIDE.md
import { colors } from './colors';
import { theme } from './theme';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  MUSEUM: '/museum',
  ITEM_DETAIL: '/item/:id',
  ITEM_XR: '/item/:id/xr',
  MUSEUM_VR: '/museum-vr',
} as const;

export const XR_CONFIG = {
  AUTO_ROTATE_TIMEOUT: 3000, // 3 giây không tương tác thì tự động xoay
  AUTO_ROTATE_SPEED: 0.5,
  CAMERA_DISTANCE: 5,
  CAMERA_FOV: 75,
};

// Export color system (backward compatibility)
export const COLORS = colors;

// Export theme system
export { colors, theme };
