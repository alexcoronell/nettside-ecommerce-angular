import { Injectable } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';

import { BaseCrudHttpRepository } from '../shared/base-crud-http.repository';
import { Discount } from '@domain/models';
import { CreateDiscountDto, UpdateDiscountDto } from '@infrastructure/http/dtos';
import { DiscountRepository } from '@domain/repositories';
import { ItemResult } from '@domain/types';
import { NameOnly } from '@domain/types/name-only.type';

@Injectable({
  providedIn: 'root',
})
export class DiscountHttpRepository
  extends BaseCrudHttpRepository<Discount, CreateDiscountDto, UpdateDiscountDto>
  implements DiscountRepository
{
  protected readonly path = 'discount';

  getAllNoPagination(): HttpResourceRef<ItemResult<NameOnly[]>> {
    return httpResource(() => `${this.url}/all`) as HttpResourceRef<ItemResult<NameOnly[]>>;
  }
}
