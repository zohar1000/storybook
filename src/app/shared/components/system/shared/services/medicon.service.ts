import { Injectable } from '@angular/core';
import { MediconServerData } from '@models/medicon-server-data.model';
import { TimelineResolutionValues } from '@shared/consts/timeline-resolution-values.const';
import { ReplaySubject, Subject } from 'rxjs';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { TimeService } from '@shared/services/time.service';
import { MediconTimelineMetrics } from '@models/timeline-metrics.model';

@Injectable()
export class MediconService {
  readonly WINDOW_COLUMNS = 12;
  readonly SCROLL_SAFE_TEXT_MARGIN = 0; // 100;
  serverData: MediconServerData;
  timelineMetrics: MediconTimelineMetrics;
  timelineMetrics$ = new ReplaySubject<MediconTimelineMetrics>(1);
  resolution: TimelineResolution;
  resolution$ = new ReplaySubject<TimelineResolution>(1);
  elGraphAreaWidth;
  xAxisValues$ = new ReplaySubject(1);
  pivotTime$ = new ReplaySubject(1);
  scroll$ = new ReplaySubject<boolean>(1);
  scrollCount = 0;

  constructor(private timeService: TimeService) {}

  init(serverData: MediconServerData, elGraphAreaWidth) {
    this.elGraphAreaWidth = elGraphAreaWidth;
    this.serverData = serverData;
    this.setResolution(this.serverData.resolution, true);
  }

  setResolution(resolution, isInit = false) {
    this.resolution = resolution;
    this.setTimelineMetrics(resolution, isInit);
    this.resolution$.next(resolution);
  }

  /*****************************************/
  /*    T I M E L I N E   M E T R I C S    */
  /*****************************************/

  private setTimelineMetrics(resolution, isInit = false) {
    const item = TimelineResolutionValues[resolution];
    const windowMiddleEpoch = isInit ? this.getPivotEpoch() : this.getWindowMiddleEpoch();
console.log('curr - resolution:', this.resolution, ', middle:', windowMiddleEpoch);
    // epoch / ms
    const totalFromEpoch =  this.timeService.gmtToEpoch(this.serverData.timelineRange.fromTimeGmt);
    const dataToEpoch = this.timeService.gmtToEpoch(this.serverData.timelineRange.toTimeGmt);
    const dataRangeInMs = dataToEpoch - totalFromEpoch;
    const columnMs = item.minutes * 60000;
    const dataColumns = dataRangeInMs / columnMs;

    // width
    const windowWidth = this.elGraphAreaWidth;
    const hardVerticalWidth = windowWidth / this.WINDOW_COLUMNS;
    const hardVerticalWidthStyle = hardVerticalWidth + 'px 100%';
    const totalLColumns = dataColumns + (item.fillerColumns ?? 0);
    const totalWidth = totalLColumns * hardVerticalWidth;
    const softVerticalWidthStyle = hardVerticalWidth / item.softVerticals + 'px 100%';
    const fillerWidth = totalWidth - (dataColumns * hardVerticalWidth);
    const totalRangeMs = totalLColumns * columnMs;
    const totalToEpoch = totalFromEpoch + totalRangeMs;
    const scrollX = this.getScrollXByEpoch(windowMiddleEpoch, totalFromEpoch, windowWidth, totalWidth, totalRangeMs);

    // pivot
    const pivotEpoch = this.getPivotEpoch();
    const pivotMs = pivotEpoch - totalFromEpoch;
    const pivotPct = pivotMs / totalRangeMs;
    const pivotX = pivotPct * totalWidth;

    this.timelineMetrics = {
      total: {
        fromEpoch: totalFromEpoch,
        toEpoch: totalToEpoch,
        width: totalWidth,
        fillerWidth,
        rangeMs: totalRangeMs
      },
      data: {
        fromEpoch: totalFromEpoch,
        toEpoch: dataToEpoch,
        columns: dataColumns
      },
      window: {
        width: windowWidth,
        rangeMs: columnMs * this.WINDOW_COLUMNS
      },


      // fromEpoch: this.timeService.gmtToEpoch(this.serverData.timelineRange.fromTimeGmt),
      // toEpoch: this.timeService.gmtToEpoch(this.serverData.timelineRange.toTimeGmt),
      columnMs,
      // xAxisValues: this.getXAxisValues(resolution, totalFromEpoch, totalToEpoch, this.serverData.timelineRange.days),
      interval: item.interval,
      // timelineWidth,
      // fullWidth,
      hardVerticalWidth,
      hardVerticalWidthStyle,
      softVerticalWidthStyle,
      xAxisValueWidth: hardVerticalWidth * item.interval,
      scrollX,
      pivotX
    }

// console.log('this.timelineMetrics:', this.timelineMetrics);
//     this.scrollToMiddlePct(middlePct);
    // this.scrollTo();
    this.scrollCount = 0;
    this.timelineMetrics$.next(this.timelineMetrics);
  }

  getWindowMiddleEpoch() {
    const prevScrollFromX = this.timelineMetrics.scrollX;
    const windowStartEpoch = this.timelineMetrics.total.fromEpoch + (prevScrollFromX / this.timelineMetrics.total.width) * this.timelineMetrics.total.rangeMs;
    const windowMiddleEpoch = windowStartEpoch + this.timelineMetrics.window.rangeMs / 2;
console.log('windowMiddleEpoch:', windowMiddleEpoch);
    return windowMiddleEpoch;
  }

  getPivotEpoch() {
    return this.timeService.gmtToEpoch(this.serverData.pivotTimeGmt);
  }

  getScrollXByEpoch(epoch, totalFromEpoch, windowWidth, totalWidth, totalRangeMs) {
    const middlePct = (epoch - totalFromEpoch) / totalRangeMs;
    const middleX = middlePct * totalWidth;
    const endX = middleX + (windowWidth / 2);
    let startX = middleX - (windowWidth / 2);
    if (endX > totalWidth) startX -= (endX - totalWidth);
    if (startX < 0) startX = 0;
    return startX;
  }

  /*************************/
  /*      S C R O L L      */
  /*************************/

//   scrollToMiddlePct(middlePct) {
// console.log('scrollToMiddlePct:', middlePct);
//     const metrics = this.timelineMetrics;
//     const middleX = middlePct * metrics.total.width;
//     const endX = middleX + (metrics.window.width / 2);
//     let startX = middleX - (metrics.window.width / 2);
//     if (endX > metrics.total.width) startX -= (endX - metrics.total.width);
//     if (startX < 0) startX = 0;
//     this.scrollLeft = startX;
//     this.scrollTo();
//   }

  onScrollTimeline(e) {
    this.timelineMetrics.scrollX = e.target.scrollLeft;
    if (this.scrollCount++) this.scroll$.next(false);
    this.scrollTo();
  }

  scrollToPivot() {
    const pivotEpoch = this.getPivotEpoch();
    const metrics = this.timelineMetrics;
    this.timelineMetrics.scrollX = this.getScrollXByEpoch(pivotEpoch, metrics.total.fromEpoch, metrics.window.width, metrics.total.width, metrics.total.rangeMs);
    this.scrollCount = 0;
    this.scroll$.next(true);
    this.scrollTo();
  }

  scrollTo() {
    const metrics = this.timelineMetrics;
    const startPct = Math.max(0, (metrics.scrollX - this.SCROLL_SAFE_TEXT_MARGIN) / metrics.total.width);

// const endPct = Math.min(1, (metrics.scrollX + this.SCROLL_SAFE_TEXT_MARGIN + metrics.window.width) / metrics.total.width);
// console.log('start/end:', (startPct * 100).toFixed(0) + '%', '/', (endPct * 100).toFixed(0) + '%');
// console.log('total from/to epoch:', metrics.total.fromEpoch, '/', metrics.total.toEpoch);

    // this.middlePct = (endPct - startPct) / 2;
    const startEpoch = metrics.total.fromEpoch + Math.round(startPct * metrics.total.rangeMs);
    const localStartEpoch = this.timeService.getLocalEpoch(startEpoch);
    const item = TimelineResolutionValues[this.resolution];
    const xAxisColumnMs = metrics.columnMs * item.interval;
    const utcStartHardVerticalEpoch = Math.floor(localStartEpoch / xAxisColumnMs) * xAxisColumnMs;
    const startColumn = Math.floor((utcStartHardVerticalEpoch - this.timeService.getLocalEpoch(metrics.total.fromEpoch)) / metrics.columnMs);
    const endColumn = Math.min(startColumn + this.WINDOW_COLUMNS + item.interval, metrics.data.columns);
    const xAxisColumns = endColumn - startColumn;
    const utcEndHardVerticalEpoch = utcStartHardVerticalEpoch + xAxisColumns * metrics.columnMs;
    let left = startColumn * metrics.hardVerticalWidth - 0.5 * metrics.xAxisValueWidth;
    // const adv = metrics.columnMs * item.interval;
    const values = [];
    for (let epoch = utcStartHardVerticalEpoch; epoch <= utcEndHardVerticalEpoch; epoch += xAxisColumnMs) {
      const value = this.timeService.getFormattedTime(item.type, this.timeService.getUtcEpoch(epoch));
      values.push({ value, left, width: metrics.xAxisValueWidth });
      left += metrics.xAxisValueWidth;
    }
    // console.log('columns:', `${startColumn}-${endColumn}`, ', values:', values[0].value, '-', values[values.length - 1].value);
    this.xAxisValues$.next(values);
  }

  /*
  getXAxisValues(resolution, totalFromEpoch, totalToEpoch, days) {
    // let epoch = this.timeService.gmtToEpoch(this.serverData.timelineRange.range.fromTimeGmt);
    console.log('server fromTimeGmt:', this.serverData.timelineRange.fromTimeGmt);
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
  */

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
