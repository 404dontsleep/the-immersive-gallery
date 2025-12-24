import createBaseContext from '@/components/BaseContext/createBaseContext';
import type { Item, ItemDto } from '@api';

export default createBaseContext<Item, ItemDto>();

