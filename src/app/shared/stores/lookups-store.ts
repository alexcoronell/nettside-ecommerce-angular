import { Injectable, computed, inject } from '@angular/core';

import { BrandHttpRepository } from '@infrastructure/http/repositories/brand-http-repository';
import { CategoryHttpRepository } from '@infrastructure/http/repositories/category-http-repository';
import { SubcategoryHttpRepository } from '@infrastructure/http/repositories/subcategory-http-repository';

@Injectable({
  providedIn: 'root',
})
export class LookupsStore {
  private readonly brandRepository = inject(BrandHttpRepository);
  private readonly categoryRepository = inject(CategoryHttpRepository);
  private readonly subcategoryRepository = inject(SubcategoryHttpRepository);

  readonly brandsResource = this.brandRepository.getAllNoPagination();
  readonly categoriesResource = this.categoryRepository.getAllNoPagination();
  readonly subcategoriesResource = this.subcategoryRepository.getAllNoPagination();

  readonly brands = computed(() => {
    const result = this.brandsResource.value();
    return result.data.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));
  });

  readonly categories = computed(() => {
    const result = this.categoriesResource.value();
    return result.data.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));
  });

  readonly subcategories = computed(() => {
    const result = this.subcategoriesResource.value();
    return result.data.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));
  });
}
