import { BaseEntity } from '@/core/entities/base.entity';
import { Entity, Property } from '@mikro-orm/decorators/legacy';

@Entity({ tableName: 'users' })
export class UserEntity extends BaseEntity {
  @Property({ type: 'decimal', precision: 12, scale: 2, default: '0.00' })
  balance: number = 0;
}
