import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormButtons } from './admin-form-buttons';

describe('AdminFormButtons', () => {
  let component: AdminFormButtons;
  let fixture: ComponentFixture<AdminFormButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFormButtons],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFormButtons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
