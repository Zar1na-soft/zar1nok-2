import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DislikeBtnComponent } from './dislike-btn.component';

describe('DislikeBtnComponent', () => {
  let component: DislikeBtnComponent;
  let fixture: ComponentFixture<DislikeBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DislikeBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DislikeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
