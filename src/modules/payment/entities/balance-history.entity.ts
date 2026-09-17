import { BaseEntity } from '@/core/entities/base.entity';
import { type Ref } from '@mikro-orm/core';
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/decorators/legacy';
import { ItemEntity } from './item.entity';
import { UserEntity } from './user.entity';

export enum BalanceAction {
  DEPOSIT = 'deposit',
  PAYMENT = 'payment',
}

@Entity({ tableName: 'balance_histories' })
export class BalanceHistoryEntity extends BaseEntity {
  @Enum(() => BalanceAction)
  action: BalanceAction;

  @Property({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Property({ onCreate: () => new Date() })
  ts: Date = new Date();

  @ManyToOne(() => UserEntity, { deleteRule: 'cascade' })
  user: Ref<UserEntity>;

  @ManyToOne(() => ItemEntity, { nullable: true, deleteRule: 'set null' })
  item?: Ref<ItemEntity>;
}
