import { BaseRepository } from '@domain/shared/base.repository';
import { PurchaseDetail } from '@domain/models';
import { CreatePurchaseDetailDto, UpdatePurchaseDetailDto } from '@infrastructure/http/dtos/purchase-detail.dto';

export abstract class PurchaseDetailRepository extends BaseRepository<
  PurchaseDetail,
  CreatePurchaseDetailDto,
  UpdatePurchaseDetailDto
> { }
