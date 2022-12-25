import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Medication } from '@stories/models/medication.model';
import { MediconLegendIconType } from '@shared/enums/medicon-legend-icon-type.enum';
import { MediconService } from '@shared/components/system/shared/services/medicon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medicon-execution-continuous',
  templateUrl: './medicon-execution-continuous.component.html',
  styleUrls: ['./medicon-execution-continuous.component.scss']
})
export class MediconExecutionContinuousComponent implements OnInit, OnDestroy {
  @Input() medication: Medication;
  MediconLegendIconType = MediconLegendIconType;
  orderIconMargin = -1;
  orderLineWidth = -1;
  executionIconMargin = -1;
  executionLineWidth = -1;
  subscription: Subscription;

  constructor(private mediconService: MediconService) {}

  ngOnInit(): void {
    this.subscription = this.mediconService.timelineMetrics$.subscribe(() => {
      this.setMedication();
    })
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  setMedication() {
    this.orderIconMargin = this.getIconMargin(this.medication.orderTime);
    const orderLineDuration = this.medication.executionTime ? this.medication.executionTime - this.medication.orderTime : this.medication.duration;
    this.orderLineWidth = this.getLineWidth(this.orderIconMargin, orderLineDuration);
    if (this.medication.executionTime) {
      this.executionIconMargin = this.getIconMargin(this.medication.executionTime);
      this.executionLineWidth = this.getLineWidth(this.executionIconMargin, this.medication.duration);
    }
  }

  getLineWidth(startX, durationInMinutes) {
    return this.mediconService.msToWidth(durationInMinutes * 60000);
  }

  getIconMargin(minutes) {
    const iconEpoch = this.mediconService.timelineMetrics.pivotEpoch + (minutes * 60000);
    return this.mediconService.epochToX(iconEpoch);
  }
}
