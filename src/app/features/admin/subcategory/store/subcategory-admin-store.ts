import { Injectable, inject } from '@angular/core';
import { SubcategoryHttpRepository } from '@infrastructure/http/repositories/subcategory-http-repository';
import { CreateSubcategoryDto, UpdateSubcategoryDto } from '@infrastructure/http/dtos';
import { Subcategory } from '@domain/models';
import { BaseCrudStore } from '@shared/stores/base-crud.store';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryAdminStore extends BaseCrudStore<
  Subcategory,
  CreateSubcategoryDto,
  UpdateSubcategoryDto
> {
  constructor() {
    super(inject(SubcategoryHttpRepository));
  }
}
