import { Component, Input, OnInit } from '@angular/core';
import { MediconTimelineRange, MediconTimelineValues } from '@models/medicon-server-data.model';

@Component({
  selector: 'app-medicon-timeline-values',
  templateUrl: './medicon-timeline-values.component.html',
  styleUrls: ['./medicon-timeline-values.component.scss']
})
export class MediconTimelineValuesComponent implements OnInit {
  @Input() timelineRange: MediconTimelineRange;
  @Input() timelineValues: MediconTimelineValues;
  @Input() timelineWidth = 0;
  timelineValuesWidth;
  timelineValuesRight;

  ngOnInit() {
    const valueWidth = this.timelineWidth / (this.timelineValues.xAxisValues.length - 1);
    this.timelineValuesWidth = valueWidth * this.timelineValues.xAxisValues.length;
    this.timelineValuesRight = -valueWidth / 2;
  }
}
