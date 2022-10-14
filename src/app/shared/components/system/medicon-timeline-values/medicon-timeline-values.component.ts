import { Component, Input, OnInit } from '@angular/core';
import { MedicationTimeline } from '@models/medicon-data.model';

@Component({
  selector: 'app-medicon-timeline-values',
  templateUrl: './medicon-timeline-values.component.html',
  styleUrls: ['./medicon-timeline-values.component.scss']
})
export class MediconTimelineValuesComponent implements OnInit {
  @Input() timeline: MedicationTimeline;
  @Input() preTimelineWidth = 0;
  @Input() timelineWidth = 0;
  timelineValuesWidth;
  timelineValuesRight;

  ngOnInit() {
    const valueWidth = this.timelineWidth / (this.timeline.xAxisValues.length - 1);
    this.timelineValuesWidth = valueWidth * this.timeline.xAxisValues.length;
    this.timelineValuesRight = -valueWidth / 2;
  }
}
