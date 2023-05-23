import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyRequestComponent } from './ready-request.component';

describe('ReadyRequestComponent', () => {
  let component: ReadyRequestComponent;
  let fixture: ComponentFixture<ReadyRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
