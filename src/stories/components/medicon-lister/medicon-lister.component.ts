import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinct, debounceTime, skip } from 'rxjs/operators';
import { Medication } from '@stories/models/medication.model';

@Component({
  selector: 'app-medicon-lister',
  templateUrl: './medicon-lister.component.html',
  styleUrls: ['./medicon-lister.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediconListerComponent implements AfterViewInit, OnDestroy {
  @Input() medications;
  @Output() change = new EventEmitter();
  @Output() deleteMedication = new EventEmitter<number>();
  medications$ = new Subject();
  subscription: Subscription;
  isAfterViewInit = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.isAfterViewInit = true;
    this.subscription = this.medications$.pipe(
      debounceTime(200),
      distinct()
    ).subscribe(value => {
      this.change.emit(value);
    });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) this.subscription.unsubscribe();
  }

  onChange(value) {
    if (this.isAfterViewInit) this.medications$.next(value);
    if (this.isAfterViewInit) console.log('onChange:', value, ', isAfterViewInit:', this.isAfterViewInit);
  }

  onClickAdd() {
    const medication: Medication = {
      id: 0,
      name: '',
      categoryId: 0,
      type: undefined,
      timingType: undefined,
      orderTime: 0,
      executionTime: 0,
      duration: 0,
      times: ['', '', '']
    };
    this.medications.unshift(medication);
    this.medications = [...this.medications];
    this.onChange(this.medications);
    this.cdr.detectChanges();
  }

  onDeleteMedication(id) {
    this.deleteMedication.emit(id);
  }
}
