import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComplaintBoxComponent } from './view-complaint-box.component';

describe('ViewComplaintBoxComponent', () => {
  let component: ViewComplaintBoxComponent;
  let fixture: ComponentFixture<ViewComplaintBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewComplaintBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComplaintBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
