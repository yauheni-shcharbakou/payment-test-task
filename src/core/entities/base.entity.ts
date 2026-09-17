import { Entity, PrimaryKey } from '@mikro-orm/decorators/legacy';
import { IEntity } from '../types/entity.types';

@Entity({ abstract: true })
export abstract class BaseEntity implements IEntity {
  @PrimaryKey({ type: 'int' })
  readonly id: number;
}
