import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListImage } from './item-list-image';

describe('ItemListImage', () => {
  let component: ItemListImage;
  let fixture: ComponentFixture<ItemListImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListImage],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListImage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
