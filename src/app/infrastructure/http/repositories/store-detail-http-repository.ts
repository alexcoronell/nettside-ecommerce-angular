import { Injectable } from '@angular/core';

import { StoreDetail } from '@domain/models';
import { StoreDetailRepository } from '@domain/repositories';
import { UpdateStoreDetailDto } from '../dtos';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { ItemResult } from '@domain/types';
import { Observable } from 'rxjs';
import { BaseHttpRepository } from '../shared/base-http.repository';

@Injectable({
  providedIn: 'root',
})
export class StoreDetailHttpRepository extends BaseHttpRepository implements StoreDetailRepository {
  protected readonly path = 'store-detail';

  get(): HttpResourceRef<ItemResult<StoreDetail>> {
    return httpResource(() => this.apiUrl) as HttpResourceRef<ItemResult<StoreDetail>>;
  }
  update(
    id: number,
    dto: UpdateStoreDetailDto
  ): Observable<ItemResult<StoreDetail>> | Promise<ItemResult<StoreDetail>> {
    return this.http.patch<ItemResult<StoreDetail>>(`${this.apiUrl}/${id.toString()}`, dto);
  }
}
