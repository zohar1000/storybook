import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediconExecutionPeriodicComponent } from './medicon-execution-periodic.component';

describe('MediconExecutionPeriodicComponent', () => {
  let component: MediconExecutionPeriodicComponent;
  let fixture: ComponentFixture<MediconExecutionPeriodicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediconExecutionPeriodicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediconExecutionPeriodicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
