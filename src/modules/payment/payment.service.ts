import { EntityManager, LockMode } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BalanceAction, BalanceHistoryEntity } from './entities/balance-history.entity';
import { ItemEntity } from './entities/item.entity';
import { UserEntity } from './entities/user.entity';
import { IPaymentCreate, IPaymentResult } from './payment.types';

@Injectable()
export class PaymentService {
  constructor(private readonly em: EntityManager) {}

  async buyItem(data: IPaymentCreate): Promise<IPaymentResult> {
    return this.em.transactional(async (forkEm): Promise<IPaymentResult> => {
      const item = await forkEm.findOne(
        ItemEntity,
        { id: data.itemId },
        { lockMode: LockMode.PESSIMISTIC_WRITE },
      );

      if (!item) {
        throw new NotFoundException(`Item with id ${data.itemId} not found`);
      }

      const user = await forkEm.findOne(
        UserEntity,
        { id: data.userId },
        { lockMode: LockMode.PESSIMISTIC_WRITE },
      );

      if (!user) {
        throw new NotFoundException(`User with id ${data.userId} not found`);
      }

      const itemPrice = Number(item.price);
      const userBalance = Number(user.balance);

      if (userBalance < itemPrice) {
        throw new BadRequestException('No enough funds');
      }

      user.balance = userBalance - itemPrice;

      const history = forkEm.create(BalanceHistoryEntity, {
        user,
        item,
        action: BalanceAction.PAYMENT,
        amount: itemPrice,
        ts: new Date(),
      });

      forkEm.persist(history);
      return { success: true, remainingBalance: user.balance };
    });
  }
}
