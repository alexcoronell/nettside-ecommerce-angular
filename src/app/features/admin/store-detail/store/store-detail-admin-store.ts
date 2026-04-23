import { Injectable, computed, inject } from '@angular/core';
import { HttpResourceRef } from '@angular/common/http';
import { StoreDetail } from '@domain/models';
import { ItemResult } from '@domain/types';
import { StoreDetailHttpRepository } from '@infrastructure/http/repositories/store-detail-http-repository';
import { UpdateStoreDetailDto } from '@infrastructure/http/dtos';
import { from, Observable } from 'rxjs';
import { mapHttpError } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class StoreDetailAdminStore {
  private readonly storeDetailRepository = inject(StoreDetailHttpRepository);

  readonly resource: HttpResourceRef<ItemResult<StoreDetail>> = this.storeDetailRepository.get();

  readonly data = computed(() => this.resource.value().data);
  readonly status = computed(() => this.resource.status());
  readonly isLoading = computed(() => this.status() === 'loading' || this.status() === 'reloading');
  readonly error = computed(() => this.resource.error());

  readonly errorMessage = computed(() => {
    const err = this.error();
    if (!err) return null;
    return mapHttpError(err);
  });

  updateItem(id: number, dto: UpdateStoreDetailDto): Observable<ItemResult<StoreDetail>> {
    return from(this.storeDetailRepository.update(id, dto));
  }

  reload() {
    this.resource.reload();
  }
}
