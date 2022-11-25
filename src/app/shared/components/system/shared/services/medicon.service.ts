import { Injectable } from '@angular/core';
import { MediconServerData, MediconTimelineMetrics } from '@models/medicon-server-data.model';
import { TimelineResolutionValues } from '@shared/consts/timeline-resolution-values.const';
import { ReplaySubject } from 'rxjs';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';

@Injectable()
export class MediconService {
  serverData: MediconServerData;
  timelineMetrics: MediconTimelineMetrics;
  timelineMetrics$ = new ReplaySubject<MediconTimelineMetrics>();
  resolution$ = new ReplaySubject<TimelineResolution>();

  init(serverData: MediconServerData, elTimelineWidth) {
    this.serverData = serverData;
    this.setResolution(this.serverData.resolution);
    this.setTimelineMetrics(elTimelineWidth, this.serverData.resolution);
  }

  setResolution(resolution) {
    this.resolution$.next(resolution);
  }

  /*****************************************/
  /*    T I M E L I N E   M E T R I C S    */
  /*****************************************/

  setTimelineMetrics(elGraphAreaWidth, resolution) {
    const timelineWidth = elGraphAreaWidth - (elGraphAreaWidth % 12);

    // for 24h
    const fullWidth = 16 / 12 * timelineWidth;
    const hardVerticalsWidth = fullWidth / 16;
    const hardVerticalsWidthStyle = hardVerticalsWidth + 'px 100%';
    const softVerticalsWidthStyle = hardVerticalsWidth / 6 + 'px 100%';
    const fillerWidth = fullWidth - timelineWidth;
    const item = TimelineResolutionValues[resolution];
    this.timelineMetrics = {
      resolution,
      xAxisValues: this.getXAxisValues(resolution, this.serverData.timelineRange.days),
      subDivision: item.subDivision,
      interval: item.interval,
      timelineWidth,
      fullWidth,
      hardVerticalsWidth,
      hardVerticalsWidthStyle,
      softVerticalsWidthStyle,
      fillerWidth
    }
    this.timelineMetrics$.next(this.timelineMetrics);
console.log('this.timelineMetrics:', this.timelineMetrics);
  }

  getXAxisValues(resolution, days) {
    const item = TimelineResolutionValues[resolution];
    const totalMinutes = days * 1440;
    const xAxisHardLines = totalMinutes / item.minutes + 1;
    const values = [];
    for (let i = 0; i < xAxisHardLines; i++) {
      values.push('TL' + i + 1);
    }
    return values;

    // const pivotEpoch = this.timeService.getMidnightEpoch(this.serverData.timeline.pivotTime.iso.substring(11, 16));
    // const roundBy = 60000 * item.minutes;
    // const roundedPivotEpoch = pivotEpoch - (pivotEpoch % roundBy);
    // const roundedPivotLocalEpoch = this.timeService.getLocalEpoch(roundedPivotEpoch);
    // const tlStartEpoch = roundedPivotLocalEpoch - (6 * roundBy);
    // const elEndEpoch = roundedPivotLocalEpoch + (6 * roundBy);
    // const values = [];
    // let interval = 0;
    // for (let time = tlStartEpoch; time <= elEndEpoch; time += roundBy) {
    //   if (item.type !== TimeDisplayType.DateTime || ++interval % 2 !== 0) {
    //     values.push(this.timeService.getFormattedTime(item.type, time));
    //   }
    // }
  }


  // getTimeline(): MediconTimelineRange {
  //   const item = TimelineResolutionValues[this.settings.resolution];
  //   const pivotEpoch = this.timeService.getMidnightEpoch(this.settings.pivotTime);
  //   const roundBy = 60000 * item.minutes;
  //   const roundedPivotEpoch = pivotEpoch - (pivotEpoch % roundBy);
  //   const roundedPivotLocalEpoch = this.timeService.getLocalEpoch(roundedPivotEpoch);
  //   const tlStartEpoch = roundedPivotLocalEpoch - (6 * roundBy);
  //   const elEndEpoch = roundedPivotLocalEpoch + (6 * roundBy);
  //   const values = [];
  //   let interval = 0;
  //   for (let time = tlStartEpoch; time <= elEndEpoch; time += roundBy) {
  //     if (item.type !== TimeDisplayType.DateTime || ++interval % 2 !== 0) {
  //       values.push(this.timeService.getFormattedTime(item.type, time));
  //     }
  //   }
  //   return {
  //     pivotTime: {
  //       epoch: this.timeService.getLocalEpoch(pivotEpoch),
  //       iso: this.timeService.getLocalIso(pivotEpoch)
  //     },
  //     range: {
  //       fromTimeGmt: values[0],
  //       fromTimeEpoch: tlStartEpoch,
  //       toTimeGmt: values[12],
  //       toTimeEpoch: elEndEpoch
  //     },
  //     xAxisValues: values,
  //     subDivision: item.subDivision,
  //     interval: item.interval,
  //     days: 12
  //   }
  // }

}
