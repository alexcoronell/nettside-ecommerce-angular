import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderItemList } from './header-item-list';

describe('HeaderItemList', () => {
  let component: HeaderItemList;
  let fixture: ComponentFixture<HeaderItemList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderItemList],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderItemList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
