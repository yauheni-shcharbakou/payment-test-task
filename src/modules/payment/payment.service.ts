import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { IPayment } from './payment.types';

@Injectable()
export class PaymentService {
  constructor(private readonly em: EntityManager) {}

  async buyItem(data: IPayment) {
    throw new Error('Not implemented');
  }
}
