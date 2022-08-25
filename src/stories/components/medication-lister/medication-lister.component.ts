import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinct, debounceTime, skip } from 'rxjs/operators';

@Component({
  selector: 'app-medication-lister',
  templateUrl: './medication-lister.component.html',
  styleUrls: ['./medication-lister.component.scss']
})
export class MedicationListerComponent implements AfterViewInit, OnDestroy {
  @Input() medications;
  @Output() change = new EventEmitter();
  medications$ = new Subject();
  subscription: Subscription;

  ngAfterViewInit(): void {
    this.subscription = this.medications$.pipe(
      debounceTime(200),
      distinct(),
      skip(1)
    ).subscribe(value => {
      console.log('medications$:', value);
      this.change.emit(value);
    });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) this.subscription.unsubscribe();
  }

  onChange(value) {
    // console.log('value:', value);
    this.medications$.next(value);
  }

}
