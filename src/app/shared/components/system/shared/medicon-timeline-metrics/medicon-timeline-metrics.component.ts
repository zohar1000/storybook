import { Component, OnInit } from '@angular/core';
import { MediconService } from '@shared/components/system/shared/services/medicon.service';

@Component({
  selector: 'app-medicon-timeline-metrics',
  templateUrl: './medicon-timeline-metrics.component.html',
  styleUrls: ['./medicon-timeline-metrics.component.scss']
})
export class MediconTimelineMetricsComponent implements OnInit {
  timelineValuesWidth;
  timelineValuesRight;

  constructor(private mediconService: MediconService) {}

  ngOnInit() {
    // const valueWidth = this.timelineWidth / (this.timelineValues.xAxisValues.length - 1);
    // this.timelineValuesWidth = valueWidth * this.timelineValues.xAxisValues.length;
    // this.timelineValuesRight = -valueWidth / 2;
  }
}
