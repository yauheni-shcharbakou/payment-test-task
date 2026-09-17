import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { IPaymentResult } from '../payment.types';

export class PaymentResultDto implements IPaymentResult {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  success: boolean;

  @ApiProperty({ description: 'remaining user balance' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  remainingBalance: number;
}
