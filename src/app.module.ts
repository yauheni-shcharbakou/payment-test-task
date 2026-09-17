import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/postgresql';
import { Module, OnModuleInit } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import mikroOrmConfig from './core/configs/mikro-orm.config';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60_000,
          limit: 20, // 20 requests per minute
        },
      ],
    }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    PaymentModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.migrator.up();
  }
}
