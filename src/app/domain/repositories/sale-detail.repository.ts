import { BaseRepository } from '@domain/shared/base.repository';
import { SaleDetail } from '@domain/models';
import { UpdateSaleDetailDto } from '@infrastructure/http/dtos/sale-detail.dto';

export abstract class SaleDetailRepository extends BaseRepository<
  SaleDetail,
  UpdateSaleDetailDto
> {}
