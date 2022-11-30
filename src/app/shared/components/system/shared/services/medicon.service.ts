import { Injectable } from '@angular/core';
import { MediconServerData } from '@models/medicon-server-data.model';
import { TimelineResolutionValues } from '@shared/consts/timeline-resolution-values.const';
import { ReplaySubject } from 'rxjs';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { TimeService } from '@shared/services/time.service';
import { TimeDisplayType } from '@shared/enums/time-display-type.enum';
import { MediconTimelineMetrics } from '@models/timeline-metrics.model';

@Injectable()
export class MediconService {
  serverData: MediconServerData;
  timelineMetrics: MediconTimelineMetrics;
  timelineMetrics$ = new ReplaySubject<MediconTimelineMetrics>();
  resolution: TimelineResolution;
  resolution$ = new ReplaySubject<TimelineResolution>();
  elGraphAreaWidth;
  xAxisValues$ = new ReplaySubject();
  readonly SCROLL_SAFE_TEXT_MARGIN = 0; // 100;

  constructor(private timeService: TimeService) {}

  init(serverData: MediconServerData, elGraphAreaWidth) {
    this.elGraphAreaWidth = elGraphAreaWidth;
    this.serverData = serverData;
    this.setResolution(this.serverData.resolution);
  }

  setResolution(resolution) {
    this.resolution = resolution;
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
    const totalLColumns = 12 + (item.filler ?? 0);
    const fullWidth = totalLColumns * hardVerticalsWidth;
    const softVerticalsWidthStyle = hardVerticalsWidth / item.softVerticals + 'px 100%';
    const fillerWidth = fullWidth - timelineWidth;

    this.timelineMetrics = {
      fromEpoch: this.timeService.gmtToEpoch(this.serverData.timelineRange.fromTimeGmt),
      toEpoch: this.timeService.gmtToEpoch(this.serverData.timelineRange.toTimeGmt),
      gapEpoch: item.minutes * item.interval * 60000,
      xAxisValues: this.getXAxisValues(resolution, this.serverData.timelineRange.days),
      interval: item.interval,
      timelineWidth,
      fullWidth,
      hardVerticalsWidth,
      hardVerticalsWidthStyle,
      softVerticalsWidthStyle,
      fillerWidth
    }
console.log('this.timelineMetrics:', this.timelineMetrics);
    this.scrollTo(0);
    this.timelineMetrics$.next(this.timelineMetrics);
  }

  onScrollTimeline(e) {
    this.scrollTo(e.target.scrollLeft);
  }

  scrollTo(scrollPos) {
    // console.log('e:', x, '/', this.timelineMetrics.fullWidth, '/', this.timelineMetrics.timelineWidth);
    const startPct = Math.max(0, (scrollPos - this.SCROLL_SAFE_TEXT_MARGIN) / this.timelineMetrics.fullWidth);
    const endPct = Math.min(1, (scrollPos + this.SCROLL_SAFE_TEXT_MARGIN + this.timelineMetrics.timelineWidth) / this.timelineMetrics.fullWidth);
    console.log('start/end:', (startPct * 100).toFixed(0) + '%', '/', (endPct * 100).toFixed(0) + '%');

    const fullRangeInMs = this.timelineMetrics.toEpoch - this.timelineMetrics.fromEpoch;
    const windowRangeInMs = fullRangeInMs * (this.timelineMetrics.timelineWidth / this.timelineMetrics.fullWidth);
    const startEpoch = this.timelineMetrics.fromEpoch + Math.round(startPct * fullRangeInMs);
console.log('from/to epoch:', this.timelineMetrics.fromEpoch, '/', this.timelineMetrics.toEpoch);
    const endEpoch = this.timeService.getLocalEpoch(this.timelineMetrics.fromEpoch + Math.round(endPct * fullRangeInMs));
    const startHardVerticalEpoch = Math.floor(this.timeService.getLocalEpoch(startEpoch) / this.timelineMetrics.gapEpoch) * this.timelineMetrics.gapEpoch;
    const item = TimelineResolutionValues[this.resolution];
    const values = [];
    const gapInMs = this.timelineMetrics.gapEpoch; // * windowRangeInMs / fullRangeInMs;
    const adjLeftInMs = gapInMs / 2;
    for (let epoch = startHardVerticalEpoch; epoch <= endEpoch; epoch += gapInMs) {
      const value = this.timeService.getFormattedTime(item.type, this.timeService.getUtcEpoch(epoch));
      // console.log('d:', d);
      const leftInMs = epoch - startHardVerticalEpoch;
      const pct = leftInMs / fullRangeInMs;
      // const left = scrollPos + (epoch - startHardVerticalEpoch) / windowRangeInMs * this.timelineMetrics.timelineWidth;
      const left = pct * this.timelineMetrics.timelineWidth;
      values.push({ value, left });
    }
    console.log('values:', values[0], '-', values[values.length - 1]);
    this.xAxisValues$.next(values);
  }

  getXAxisValues(resolution, days) {
    // let epoch = this.timeService.gmtToEpoch(this.serverData.timelineRange.range.fromTimeGmt);
    console.log('epoch2:', this.serverData.timelineRange.fromTimeGmt);
    let d = new Date(this.serverData.timelineRange.fromTimeGmt.substring(0, 10));
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
      // if (item.type !== TimeDisplayType.DateTime || ++interval % 2 !== 0) {
      //   values.push(this.timeService.getFormattedTime(item.type, epoch));
      // }
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
