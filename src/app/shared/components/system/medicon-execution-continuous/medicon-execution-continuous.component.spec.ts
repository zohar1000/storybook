import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediconExecutionContinuousComponent } from './medicon-execution-continuous.component';

describe('MediconExecutionContinuousComponent', () => {
  let component: MediconExecutionContinuousComponent;
  let fixture: ComponentFixture<MediconExecutionContinuousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediconExecutionContinuousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediconExecutionContinuousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
