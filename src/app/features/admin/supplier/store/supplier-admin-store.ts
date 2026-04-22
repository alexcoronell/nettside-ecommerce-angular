import { Injectable, inject } from '@angular/core';
import { BaseCrudStore } from '@shared/stores/base-crud.store';
import { SupplierHttpRepository } from '@infrastructure/http/repositories/supplier-http-repository';
import { Supplier } from '@domain/models';
import { CreateSupplierDto, UpdateSupplierDto } from '@infrastructure/http/dtos';

@Injectable({
  providedIn: 'root',
})
export class SupplierAdminStore extends BaseCrudStore<
  Supplier,
  CreateSupplierDto,
  UpdateSupplierDto
> {
  constructor() {
    super(inject(SupplierHttpRepository));
  }
}
