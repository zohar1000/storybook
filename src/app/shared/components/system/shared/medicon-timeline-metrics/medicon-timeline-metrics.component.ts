import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediconService } from '@shared/components/system/shared/services/medicon.service';
import { MediconTimelineMetrics } from '@models/medicon-server-data.model';

@Component({
  selector: 'app-medicon-timeline-metrics',
  templateUrl: './medicon-timeline-metrics.component.html',
  styleUrls: ['./medicon-timeline-metrics.component.scss']
})
export class MediconTimelineMetricsComponent implements OnInit, OnDestroy {
  timelineValuesWidth;
  timelineValuesRight;
  subscription;

  constructor(public mediconService: MediconService) {}

  ngOnInit() {
    // const valueWidth = this.timelineWidth / (this.timelineValues.xAxisValues.length - 1);
    // this.timelineValuesWidth = valueWidth * this.timelineValues.xAxisValues.length;
    // this.timelineValuesRight = -valueWidth / 2;

    this.subscription = this.mediconService.timelineMetrics$.subscribe((metrics: MediconTimelineMetrics) => {
      // metrics.a =;
      console.log('hardVerticalsWidth:', metrics.hardVerticalsWidth);
      console.log('xAxisValues.length:', metrics.xAxisValues.length);
      console.log('xAxisValues:', metrics.xAxisValues);
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
