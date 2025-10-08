import { BaseEntity } from '@/base/base-entity';
import { DefaultParentName } from '@/permission/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity()
export class SysConfig<T> extends BaseEntity {
  @ApiProperty()
  @Column({
    unique: true,
  })
  key: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({
    type: 'jsonb',
    transformer: {
      to: (value: any) => value,
      from: (value: any) => {
        try {
          return typeof value === 'string' ? JSON.parse(value) : value;
        } catch {
          return value;
        }
      },
    },
  })
  value: T;

  @ApiProperty()
  @Column({
    type: 'jsonb',
    default: [DefaultParentName.Root],
    transformer: {
      to: (value: any) => value,
      from: (value: any) => {
        try {
          return typeof value === 'string' ? JSON.parse(value) : value;
        } catch {
          return value;
        }
      },
    },
  })
  allowPermission: string[];
}
