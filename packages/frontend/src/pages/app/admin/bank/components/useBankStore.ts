import createBaseContext from '@/components/BaseContext/createBaseContext';
import type { Bank, BankDto } from '@api';

export default createBaseContext<Bank, BankDto>();
