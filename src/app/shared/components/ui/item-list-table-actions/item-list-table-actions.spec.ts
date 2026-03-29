import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListTableActions } from './item-list-table-actions';

describe('ItemListTableActions', () => {
  let component: ItemListTableActions;
  let fixture: ComponentFixture<ItemListTableActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListTableActions],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListTableActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
