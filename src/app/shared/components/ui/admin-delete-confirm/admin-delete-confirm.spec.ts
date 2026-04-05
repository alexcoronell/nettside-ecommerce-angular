import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteConfirm } from './admin-delete-confirm';

describe('AdminDeleteConfirm', () => {
  let component: AdminDeleteConfirm;
  let fixture: ComponentFixture<AdminDeleteConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDeleteConfirm],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDeleteConfirm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
