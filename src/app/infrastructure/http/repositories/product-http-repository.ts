import { Injectable } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';

import { BaseCrudHttpRepository } from '../shared/base-crud-http.repository';
import { Product } from '@domain/models';
import { CreateProductDto, UpdateProductDto } from '../dtos';
import { ProductRepository } from '@domain/repositories';

import { ItemResult } from '@domain/types';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpRepository
  extends BaseCrudHttpRepository<Product, CreateProductDto, UpdateProductDto>
  implements ProductRepository
{
  protected readonly path = 'product';

  getBySlug(slug: string): HttpResourceRef<ItemResult<Product>> {
    return httpResource(() => `${this.url}/slug/${slug}`) as HttpResourceRef<ItemResult<Product>>;
  }
}
