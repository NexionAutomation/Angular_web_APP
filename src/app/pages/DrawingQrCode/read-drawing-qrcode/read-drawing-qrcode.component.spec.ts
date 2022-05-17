import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDrawingQrcodeComponent } from './read-drawing-qrcode.component';

describe('ReadDrawingQrcodeComponent', () => {
  let component: ReadDrawingQrcodeComponent;
  let fixture: ComponentFixture<ReadDrawingQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadDrawingQrcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadDrawingQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
