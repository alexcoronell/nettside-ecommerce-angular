import { Injectable, computed, inject } from '@angular/core';

import { CategoryHttpRepository } from '@infrastructure/http/repositories/category-http-repository';

@Injectable({
  providedIn: 'root',
})
export class LookupsStore {
  private readonly categoryRepository = inject(CategoryHttpRepository);

  readonly categoriesResource = this.categoryRepository.getAllNoPagination();

  readonly categories = computed(() => {
    const result = this.categoriesResource.value();
    return result.data.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));
  });
}
