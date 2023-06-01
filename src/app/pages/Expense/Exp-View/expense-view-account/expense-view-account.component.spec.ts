import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseViewAccountComponent } from './expense-view-account.component';

describe('ExpenseViewAccountComponent', () => {
  let component: ExpenseViewAccountComponent;
  let fixture: ComponentFixture<ExpenseViewAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseViewAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseViewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
