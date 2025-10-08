import { BaseEntity } from '@/base/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity()
export class SysCron extends BaseEntity {
  @ApiProperty()
  @Column({
    unique: true,
  })
  name: string;

  @ApiProperty()
  @Column()
  cronExpression: string;

  @ApiProperty()
  @Column({ default: false })
  enabled: boolean;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  lastRunAt: Date | null;
}
