import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonUploadImageComponent } from './button-upload-image.component';

describe('ButtonUploadImageComponent', () => {
  let component: ButtonUploadImageComponent;
  let fixture: ComponentFixture<ButtonUploadImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonUploadImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
