import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
