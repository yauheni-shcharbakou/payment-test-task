import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { IPaymentCreate } from '../payment.types';

export class PaymentCreateDto implements IPaymentCreate {
  @ApiProperty({ example: 1, description: 'user ID' })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  userId: number;

  @ApiProperty({ example: 1, description: 'item ID' })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  itemId: number;
}
