import { Injectable, inject } from '@angular/core';
import { CategoryHttpRepository } from '@infrastructure/http/repositories/category-http-repository';
import { CreateCategoryDto, UpdateCategoryDto } from '@infrastructure/http/dtos';
import { Category } from '@domain/models';
import { BaseCrudStore } from '@shared/stores/base-crud.store';

@Injectable({
  providedIn: 'root',
})
export class CategoryAdminStore extends BaseCrudStore<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor() {
    super(inject(CategoryHttpRepository));
  }
}
