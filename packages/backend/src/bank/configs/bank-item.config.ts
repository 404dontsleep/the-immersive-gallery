import { DefaultParentName } from '@/permission/decorators/register-permission.decorator';
import { SysConfigProvide } from '@/sys-config/sys-config.provide';
import { TransactionDto } from '@/transaction/dtos/transaction.dto';

export class BankItemConfig implements SysConfigProvide {
  allowPermission = [DefaultParentName.Root];
  key = 'BankItemConfig';
  description = 'Bank item config';
  value: {
    items: TransactionDto['items'];
    extra: number;
    extraExpired: number;
    extraItems: TransactionDto['items'];
  } = {
    items: [
      {
        itemType: {
          id: 1,
        },
        quantity: 1,
      },
    ],
    extra: 0,
    extraExpired: 0,
    extraItems: [],
  };
}
