import { Inject } from '@nestjs/common';

export const InjectConfig = (key: string) => Inject(`SYS_CONFIG_${key}`);
