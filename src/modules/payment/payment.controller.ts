import {
  ApiBadRequestExceptions,
  ApiNotFoundExceptions,
} from '@/core/decorators/api-exception.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PaymentCreateDto } from './dto/payment.create.dto';
import { PaymentResultDto } from './dto/payment.result.dto';
import { PaymentService } from './payment.service';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Item purchase' })
  @ApiBadRequestExceptions(['No enough funds'])
  @ApiNotFoundExceptions(['Item with id 1 not found', 'User with id 1 not found'])
  async buyItem(@Body() body: PaymentCreateDto): Promise<PaymentResultDto> {
    const result = await this.paymentService.buyItem(body);
    return plainToInstance(PaymentResultDto, result);
  }
}
