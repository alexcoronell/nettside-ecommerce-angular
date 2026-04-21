import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountForm } from './discount-form';

describe('DiscountForm', () => {
  let component: DiscountForm;
  let fixture: ComponentFixture<DiscountForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountForm],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscountForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
