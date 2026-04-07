import { BaseRepository } from '@domain/shared/base.repository';
import { Purchase } from '@domain/models';
import { CreatePurchaseDto, UpdatePurchaseDto } from '@infrastructure/http/dtos/purchase.dto';

export abstract class PurchaseRepository extends BaseRepository<
  Purchase,
  CreatePurchaseDto,
  UpdatePurchaseDto
> {}
