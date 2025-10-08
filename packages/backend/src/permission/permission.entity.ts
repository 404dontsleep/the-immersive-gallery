import { BaseEntity } from '@/base/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { User } from '@/user/user.entity';

@Entity()
export class Permission extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column({ default: false })
  @ApiProperty()
  canDelete: boolean;

  @ManyToMany(() => User, user => user.permissions)
  users: User[];

  @ManyToMany(() => Permission, permission => permission.children)
  parents: Permission[];

  @ManyToMany(() => Permission, permission => permission.parents)
  @JoinTable({
    name: 'permission_relations',
    joinColumn: {
      name: 'parentId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'childId',
      referencedColumnName: 'id',
    },
  })
  children: Permission[];

  @ApiProperty()
  @JoinColumn({ name: 'parentIds', referencedColumnName: 'id' })
  parentIds: number[];
}
