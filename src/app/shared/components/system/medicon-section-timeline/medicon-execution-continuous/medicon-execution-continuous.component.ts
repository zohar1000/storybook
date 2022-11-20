import { Component, Input, OnInit } from '@angular/core';
import { Medication } from '@stories/models/medication.model';
import { MediconTimelineRange } from '@models/medicon-server-data.model';
import { MediconLegendIconType } from '@shared/enums/medicon-legend-icon-type.enum';

@Component({
  selector: 'app-medicon-execution-continuous',
  templateUrl: './medicon-execution-continuous.component.html',
  styleUrls: ['./medicon-execution-continuous.component.scss']
})
export class MediconExecutionContinuousComponent implements OnInit {
  @Input() timelineRange: MediconTimelineRange;
  @Input() medication: Medication;
  @Input() timelineWidth;
  MediconLegendIconType = MediconLegendIconType;
  timelineWidthInMs;
  orderIconMargin = -1;
  orderLineWidth = -1;
  executionIconMargin = -1;
  executionLineWidth = -1;

  ngOnInit(): void {
    this.timelineWidthInMs = this.timelineRange.range.toTimeEpoch - this.timelineRange.range.fromTimeEpoch;
    this.orderIconMargin = this.getIconMargin(this.medication.orderTime);
    const orderLineDuration = this.medication.executionTime ? this.medication.executionTime - this.medication.orderTime : this.medication.duration;
    this.orderLineWidth = this.getLineWidth(this.orderIconMargin, orderLineDuration);
    if (this.medication.executionTime) {
      this.executionIconMargin = this.getIconMargin(this.medication.executionTime);
      this.executionLineWidth = this.getLineWidth(this.executionIconMargin, this.medication.duration);
    }
  }

  getLineWidth(startX, durationInMinutes) {
    let width = (durationInMinutes * 60000 / this.timelineWidthInMs) * this.timelineWidth;
    if (startX + width > this.timelineWidth) width = this.timelineWidth - startX - 1;  // not to exceed timeline
    return width; // (durationInMinutes * 60000 / this.timelineWidthInMs) * this.timelineWidth;
  }

  getIconMargin(epoch) {
    const iconEpoch = this.timelineRange.pivotTime.epoch + (epoch * 60000);
    const pct = this.getTimelinePct(iconEpoch);
    return pct * this.timelineWidth;
  }

  getTimelinePct(pos) {
    return (pos - this.timelineRange.range.fromTimeEpoch) / this.timelineWidthInMs;
  }
}
