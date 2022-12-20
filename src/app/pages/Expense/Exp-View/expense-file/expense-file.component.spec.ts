import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseFileComponent } from './expense-file.component';

describe('ExpenseFileComponent', () => {
  let component: ExpenseFileComponent;
  let fixture: ComponentFixture<ExpenseFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
