import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListTableFooter } from './item-list-table-footer';

describe('ItemListTableFooter', () => {
  let component: ItemListTableFooter;
  let fixture: ComponentFixture<ItemListTableFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListTableFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListTableFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
