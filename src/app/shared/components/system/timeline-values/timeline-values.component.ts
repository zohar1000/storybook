import { Component, Input, OnInit } from '@angular/core';
import { MedicationTimeline } from '@models/medications-concentrated-data.model';

@Component({
  selector: 'app-timeline-values',
  templateUrl: './timeline-values.component.html',
  styleUrls: ['./timeline-values.component.scss']
})
export class TimelineValuesComponent implements OnInit {
  @Input() timeline: MedicationTimeline;
  @Input() preTimelineWidth = 0;
  @Input() timelineWidth = 0;
  timelineValuesWidth;
  timelineValuesRight;

  ngOnInit() {
    const valueWidth = this.timelineWidth / 12;
    this.timelineValuesWidth = valueWidth * this.timeline.xAxisValues.length;
    this.timelineValuesRight = -valueWidth / 2;
  }
}
