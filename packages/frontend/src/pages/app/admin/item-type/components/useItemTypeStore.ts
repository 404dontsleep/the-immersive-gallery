import createBaseContext from '@/components/BaseContext/createBaseContext';
import type { ItemType, ItemTypeDto } from '@api';

export default createBaseContext<ItemType, ItemTypeDto>();
