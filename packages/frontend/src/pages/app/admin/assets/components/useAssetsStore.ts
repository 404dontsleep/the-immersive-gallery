import createBaseContext from '@/components/BaseContext/createBaseContext';
import type { AssetsItem, AssetsItemDto } from '@api';

export default createBaseContext<AssetsItem, AssetsItemDto>();
