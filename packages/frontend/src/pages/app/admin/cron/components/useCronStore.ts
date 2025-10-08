import createBaseContext from '@/components/BaseContext/createBaseContext';
import type { SysCron, SysCronDto } from '@api';

export default createBaseContext<SysCron, SysCronDto>();
