import { SetMetadata } from '@nestjs/common';

export const DB_CRON_METADATA = 'db_cron_metadata';

export interface DbCronOptions {
  name: string;
  expression: string;
}

export const DbCron = (options: DbCronOptions) =>
  SetMetadata(DB_CRON_METADATA, options);
