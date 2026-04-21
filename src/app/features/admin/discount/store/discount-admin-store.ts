import { Injectable, inject } from '@angular/core';
import { DiscountHttpRepository } from '@infrastructure/http/repositories/discount-http-repository';
import { Discount } from '@domain/models';
import { BaseCrudStore } from '@shared/stores/base-crud.store';
import { CreateDiscountDto, UpdateDiscountDto } from '@infrastructure/http/dtos';

@Injectable({
  providedIn: 'root',
})
export class DiscountAdminStore extends BaseCrudStore<
  Discount,
  CreateDiscountDto,
  UpdateDiscountDto
> {
  constructor() {
    super(inject(DiscountHttpRepository));
  }
}
