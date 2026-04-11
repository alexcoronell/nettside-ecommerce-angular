import { Injectable, inject } from '@angular/core';
import { BrandHttpRepository } from '@infrastructure/http/repositories/brand-http-repository';
import { CreateBrandDto, UpdateBrandDto } from '@infrastructure/http/dtos';
import { Brand } from '@domain/models';
import { BaseCrudStore } from '@shared/stores/base-crud.store';

@Injectable({
  providedIn: 'root',
})
export class BrandAdminStore extends BaseCrudStore<Brand, CreateBrandDto, UpdateBrandDto> {
  constructor() {
    super(inject(BrandHttpRepository));
  }
}
