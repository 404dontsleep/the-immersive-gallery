import createBaseContext from '@/components/BaseContext/createBaseContext';
import type { Transaction, TransactionDto } from '@api';

export default createBaseContext<Transaction, TransactionDto>();
