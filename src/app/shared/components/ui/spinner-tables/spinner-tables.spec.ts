import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerTables } from './spinner-tables';

describe('SpinnerTables', () => {
  let component: SpinnerTables;
  let fixture: ComponentFixture<SpinnerTables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerTables],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerTables);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
