import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseViewmanagerComponent } from './expense-viewmanager.component';

describe('ExpenseViewmanagerComponent', () => {
  let component: ExpenseViewmanagerComponent;
  let fixture: ComponentFixture<ExpenseViewmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseViewmanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseViewmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
