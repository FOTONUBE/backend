import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentAccountDto } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentAccountDto) {}
