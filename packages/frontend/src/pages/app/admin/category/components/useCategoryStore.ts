import createBaseContext from '@/components/BaseContext/createBaseContext';
import type { Category, CategoryDto } from '@api';

export default createBaseContext<Category, CategoryDto>();

