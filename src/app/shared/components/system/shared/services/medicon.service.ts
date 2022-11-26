import { Injectable } from '@angular/core';
import { MediconServerData, MediconTimelineMetrics } from '@models/medicon-server-data.model';
import { TimelineResolutionValues } from '@shared/consts/timeline-resolution-values.const';
import { ReplaySubject } from 'rxjs';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { TimeService } from '@shared/services/time.service';
import { TimeDisplayType } from '@shared/enums/time-display-type.enum';

@Injectable()
export class MediconService {
  serverData: MediconServerData;
  timelineMetrics: MediconTimelineMetrics;
  timelineMetrics$ = new ReplaySubject<MediconTimelineMetrics>();
  resolution$ = new ReplaySubject<TimelineResolution>();
  elGraphAreaWidth;

  constructor(private timeService: TimeService) {}

  init(serverData: MediconServerData, elGraphAreaWidth) {
    this.elGraphAreaWidth = elGraphAreaWidth;
    this.serverData = serverData;
    this.setResolution(this.serverData.resolution);
  }

  setResolution(resolution) {
    this.setTimelineMetrics(resolution);
    this.resolution$.next(resolution);
  }

  /*****************************************/
  /*    T I M E L I N E   M E T R I C S    */
  /*****************************************/

  setTimelineMetrics(resolution) {
    const item = TimelineResolutionValues[resolution];
    const hardVerticalsWidth = Math.floor(this.elGraphAreaWidth / 12);
    const hardVerticalsWidthStyle = hardVerticalsWidth + 'px 100%';
    const timelineWidth = hardVerticalsWidth * 12;

    // for 24h
    const totalLCells = 12 + (item.filler ?? 0);
    const fullWidth = totalLCells * hardVerticalsWidth;
    const softVerticalsWidthStyle = hardVerticalsWidth / item.softVerticals + 'px 100%';
    const fillerWidth = fullWidth - timelineWidth;
    this.timelineMetrics = {
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
  }

  getXAxisValues(resolution, days) {
    // let epoch = this.timeService.gmtToEpoch(this.serverData.timelineRange.range.fromTimeGmt);
    console.log('epoch2:', this.serverData.timelineRange.range.fromTimeGmt);
    let d = new Date(this.serverData.timelineRange.range.fromTimeGmt.substring(0, 10));
    console.log('d:', d.toISOString());
    let startEpoch = d.getTime();
    console.log('startEpoch:', startEpoch);
    console.time('getXAxisValues');
    const item = TimelineResolutionValues[resolution];
    const totalRangeInMs = this.serverData.timelineRange.days * 1440 * 60000;
    const endEpoch = startEpoch + totalRangeInMs;
    const adv = item.minutes * 60000;
    const values = [];
    let interval = 0;
    for (let epoch = startEpoch; epoch <= endEpoch; epoch += adv) {
      if (item.type !== TimeDisplayType.DateTime || ++interval % 2 !== 0) {
        values.push(this.timeService.getFormattedTime(item.type, epoch));
      }
      // values.push('TL' + i + 1);
      // const time = (new Date(epoch)).toISOString();
      // values.push(time);
    }
    console.timeEnd('getXAxisValues');
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
