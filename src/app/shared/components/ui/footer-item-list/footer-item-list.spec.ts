import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterItemList } from './footer-item-list';

describe('FooterItemList', () => {
  let component: FooterItemList;
  let fixture: ComponentFixture<FooterItemList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterItemList],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterItemList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
