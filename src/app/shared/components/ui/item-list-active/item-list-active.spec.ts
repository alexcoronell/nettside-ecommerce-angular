import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListActive } from './item-list-active';

describe('ItemListActive', () => {
  let component: ItemListActive;
  let fixture: ComponentFixture<ItemListActive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListActive],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListActive);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
