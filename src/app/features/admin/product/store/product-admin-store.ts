import { Injectable, inject } from '@angular/core';
import { BaseCrudStore } from '@shared/stores/base-crud.store';
import { ProductHttpRepository } from '@infrastructure/http/repositories/product-http-repository';
import { Product } from '@domain/models';
import { CreateProductDto, UpdateProductDto } from '@infrastructure/http/dtos';

@Injectable({
  providedIn: 'root',
})
export class ProductAdminStore extends BaseCrudStore<Product, CreateProductDto, UpdateProductDto> {
  constructor() {
    super(inject(ProductHttpRepository));
  }
}
