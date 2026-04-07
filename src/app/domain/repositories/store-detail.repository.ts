import { BaseRepository } from '@domain/shared/base.repository';
import { StoreDetail } from '@domain/models';
import {
  CreateStoreDetailDto,
  UpdateStoreDetailDto,
} from '@infrastructure/http/dtos/store-detail.dto';

export abstract class StoreDetailRepository extends BaseRepository<
  StoreDetail,
  CreateStoreDetailDto,
  UpdateStoreDetailDto
> {}
