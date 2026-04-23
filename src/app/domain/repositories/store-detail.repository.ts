import { HttpResourceRef } from '@angular/common/http';
import { Observable } from 'rxjs';

/* Model */
import { StoreDetail } from '@domain/models';

/* DTO */
import { UpdateStoreDetailDto } from '@infrastructure/http/dtos/store-detail.dto';

/* Type */
import { ItemResult } from '@domain/types/item-result.type';

export abstract class StoreDetailRepository {
  abstract get(): HttpResourceRef<ItemResult<StoreDetail>>;

  abstract update(
    id: number,
    dto: UpdateStoreDetailDto
  ): Observable<ItemResult<StoreDetail>> | Promise<ItemResult<StoreDetail>>;
}
