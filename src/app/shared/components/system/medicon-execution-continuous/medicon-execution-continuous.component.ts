import { Component, Input, OnInit } from '@angular/core';
import { Medication } from '@stories/models/medication.model';
import { MediconTimeline } from '@models/medicon-data.model';
import { MediconLegendIcons } from '@shared/consts/medicon-legend-icons.const';

@Component({
  selector: 'app-medicon-execution-continuous',
  templateUrl: './medicon-execution-continuous.component.html',
  styleUrls: ['./medicon-execution-continuous.component.scss']
})
export class MediconExecutionContinuousComponent implements OnInit {
  @Input() timeline: MediconTimeline;
  @Input() medication: Medication;
  @Input() timelineWidth;
  MediconLegendIcons = MediconLegendIcons;
  timelineWidthInMs;
  orderIconMargin = -1;
  orderLineMargin = -1;
  orderLineWidth = -1;
  executionIconMargin = -1;
  executionLineMargin = -1;
  executionLineWidth = -1;

  ngOnInit(): void {
    this.timelineWidthInMs = this.timeline.range.toEpoch - this.timeline.range.fromEpoch;
    this.orderIconMargin = this.getIconMargin(this.medication.orderTime);
    this.orderLineMargin = this.getIconMargin(this.medication.orderTime);
    this.orderLineWidth = this.getLineWidth(this.orderLineMargin, this.medication.executionTime - this.medication.orderTime);
    this.executionIconMargin = this.getIconMargin(this.medication.executionTime);
    this.executionLineMargin = this.getIconMargin(this.medication.executionTime);
    this.executionLineWidth = this.getLineWidth(this.executionLineMargin, this.medication.duration);
  }

  getLineWidth(startX, durationInMinutes) {
    let width = (durationInMinutes * 60000 / this.timelineWidthInMs) * this.timelineWidth;
    if (startX + width > this.timelineWidth) width = this.timelineWidth - startX - 1;
    return width; // (durationInMinutes * 60000 / this.timelineWidthInMs) * this.timelineWidth;
  }

  getIconMargin(epoch) {
    const iconEpoch = this.timeline.pivotTime.epoch + (epoch * 60000);
    const pct = this.getTimelinePct(iconEpoch);
    return pct * this.timelineWidth;
  }

  getTimelinePct(pos) {
    return (pos - this.timeline.range.fromEpoch) / this.timelineWidthInMs;
  }
}
