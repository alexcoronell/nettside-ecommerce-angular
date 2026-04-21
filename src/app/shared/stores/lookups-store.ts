import { Injectable, computed, inject } from '@angular/core';

import { CategoryHttpRepository } from '@infrastructure/http/repositories/category-http-repository';
import { BrandHttpRepository } from '@infrastructure/http/repositories/brand-http-repository';

@Injectable({
  providedIn: 'root',
})
export class LookupsStore {
  private readonly categoryRepository = inject(CategoryHttpRepository);
  private readonly brandRepository = inject(BrandHttpRepository);

  readonly categoriesResource = this.categoryRepository.getAllNoPagination();
  readonly brandsResource = this.brandRepository.getAllNoPagination();

  readonly categories = computed(() => {
    const result = this.categoriesResource.value();
    return result.data.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));
  });

  readonly brands = computed(() => {
    const result = this.brandsResource.value();
    return result.data.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));
  });
}
