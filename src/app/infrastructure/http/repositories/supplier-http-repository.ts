import { Injectable } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';

import { BaseCrudHttpRepository } from '../shared/base-crud-http.repository';
import { Supplier } from '@domain/models';
import { CreateSupplierDto, UpdateSupplierDto } from '@infrastructure/http/dtos';
import { SupplierRepository } from '@domain/repositories/supplier.repository';
import { ItemResult } from '@domain/types';
import { NameOnly } from '@domain/types/name-only.type';

@Injectable({
  providedIn: 'root',
})
export class SupplierHttpRepository
  extends BaseCrudHttpRepository<Supplier, CreateSupplierDto, UpdateSupplierDto>
  implements SupplierRepository
{
  protected readonly path = 'supplier';

  getAllNoPagination(): HttpResourceRef<ItemResult<NameOnly[]>> {
    return httpResource(() => `${this.url}/all`) as HttpResourceRef<ItemResult<NameOnly[]>>;
  }
}
