import { BaseEntity } from '@/core/entities/base.entity';
import { Entity, Property } from '@mikro-orm/decorators/legacy';

@Entity({ tableName: 'items' })
export class ItemEntity extends BaseEntity {
  @Property({ type: 'varchar' })
  title: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
