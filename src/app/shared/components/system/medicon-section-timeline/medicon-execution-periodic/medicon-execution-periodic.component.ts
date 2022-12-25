import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediconLegendIconType } from '@shared/enums/medicon-legend-icon-type.enum';
import { Medication } from '@stories/models/medication.model';
import { MediconService } from '@shared/components/system/shared/services/medicon.service';
import { Subscription } from 'rxjs';
import { TimeService } from '@shared/services/time.service';

@Component({
  selector: 'app-medicon-execution-periodic',
  templateUrl: './medicon-execution-periodic.component.html',
  styleUrls: ['../medicon-execution-continuous/medicon-execution-continuous.component.scss']
})
export class MediconExecutionPeriodicComponent implements OnInit, OnDestroy {
  @Input() medication: Medication;
  MediconLegendIconType = MediconLegendIconType;
  subscription: Subscription;
  iconMargins = [];

  constructor(private mediconService: MediconService, private timeService: TimeService) {}

  ngOnInit(): void {
    this.subscription = this.mediconService.timelineMetrics$.subscribe(() => {
      this.setMedication();
    })
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  setMedication() {
    this.medication.times.forEach(time => {
      const iconEpoch = this.timeService.gmtToEpoch(time);
      const x = this.mediconService.epochToX(iconEpoch);
      this.iconMargins.push(x);
    });
    this.iconMargins = [0];
  }
}
