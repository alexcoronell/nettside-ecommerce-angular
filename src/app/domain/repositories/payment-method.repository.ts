import { BaseRepository } from '@domain/shared/base.repository';
import { PaymentMethod } from '@domain/models';
import { CreatePaymentMethodDto } from '@infrastructure/http/dtos/payment-method.dto';

export abstract class PaymentMethodRepository extends BaseRepository<
  PaymentMethod,
  CreatePaymentMethodDto
> {}
