import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListTableHeader } from './item-list-table-header';

describe('ItemListTableHeader', () => {
  let component: ItemListTableHeader;
  let fixture: ComponentFixture<ItemListTableHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListTableHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListTableHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
