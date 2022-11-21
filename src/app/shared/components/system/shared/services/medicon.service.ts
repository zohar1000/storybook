import { Injectable } from '@angular/core';
import { MediconServerData, MediconTimelineRange, MediconTimelineValues, MediconTimeMetrics } from '@models/medicon-server-data.model';
import { TimelineResolutionValues } from '@shared/consts/timeline-resolution-values.const';
import { TimeDisplayType } from '@shared/enums/time-display-type.enum';

@Injectable()
export class MediconService {
  serverData: MediconServerData;
  timelineValues: MediconTimelineValues;
  timelineMetrics: MediconTimeMetrics;

  constructor() {
    console.log('service con');
  }

  /***************************************/
  /*    T I M E L I N E   V A L U E S    */
  /***************************************/

  setTimelineValues(resolution) {
    const item = TimelineResolutionValues[resolution];
    this.timelineValues = {
      resolution,
      xAxisValues: this.getTimelineXAxis(resolution, this.serverData.timelineRange.days),
      subDivision: item.subDivision,
      interval: item.interval,
    }
  }

  calcTimelineValues(resolution) {
  }

  getTimelineXAxis(resolution, days) {
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
