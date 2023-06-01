import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComplaintBoxComponent } from './create-complaint-box.component';

describe('CreateComplaintBoxComponent', () => {
  let component: CreateComplaintBoxComponent;
  let fixture: ComponentFixture<CreateComplaintBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComplaintBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComplaintBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
