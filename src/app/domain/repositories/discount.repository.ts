import { BaseRepository } from '@domain/shared/base.repository';
import { Discount } from '@domain/models';
import { CreateDiscountDto } from '@infrastructure/http/dtos/discount.dto';

export abstract class DiscountRepository extends BaseRepository<Discount, CreateDiscountDto> {}
