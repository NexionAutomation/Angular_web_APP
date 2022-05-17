import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDrawingQrcodeComponent } from './create-drawing-qrcode.component';

describe('CreateDrawingQrcodeComponent', () => {
  let component: CreateDrawingQrcodeComponent;
  let fixture: ComponentFixture<CreateDrawingQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDrawingQrcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDrawingQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
