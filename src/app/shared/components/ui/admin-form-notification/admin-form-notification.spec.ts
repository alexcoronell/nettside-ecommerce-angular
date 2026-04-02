import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormNotification } from './admin-form-notification';

describe('AdminFormNotification', () => {
  let component: AdminFormNotification;
  let fixture: ComponentFixture<AdminFormNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFormNotification],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFormNotification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
