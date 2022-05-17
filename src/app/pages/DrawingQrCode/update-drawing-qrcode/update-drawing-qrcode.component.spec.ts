import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDrawingQrcodeComponent } from './update-drawing-qrcode.component';

describe('UpdateDrawingQrcodeComponent', () => {
  let component: UpdateDrawingQrcodeComponent;
  let fixture: ComponentFixture<UpdateDrawingQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDrawingQrcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDrawingQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
