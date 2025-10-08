import { SysConfigProvide } from '@/sys-config/sys-config.provide';
import { DefaultParentName } from '../decorators';

export default class TestConfig implements SysConfigProvide {
  key = 'TestConfig';
  description = 'Test config';
  value = {
    test: 'test',
    a: [1, 2, 3],
  };
  allowPermission = [DefaultParentName.Root];
}
