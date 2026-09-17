import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BalanceHistoryEntity } from './entities/balance-history.entity';
import { ItemEntity } from './entities/item.entity';
import { UserEntity } from './entities/user.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity, ItemEntity, BalanceHistoryEntity])],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
