import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { Direction } from '@stories/models/direction.model';
import { MediconServerData } from '@models/medicon-server-data.model';
import { MediconService } from '@shared/components/system/shared/services/medicon.service';

// TODO:
// 1. onPush
// 2. horizontal lines blur when resolution goes down
// icon to pivot


@Component({
  selector: 'app-medicon',
  templateUrl: './medicon.component.html',
  styleUrls: ['./medicon.component.scss']
})
export class MediconComponent {
  @ViewChild('header', { static: true }) elRefHeader: ElementRef;
  @ViewChild('graphArea', { static: true }) elRefGraphArea: ElementRef;
  @Input() direction: Direction;
  @Input() text: any;
  @Input() serverData: MediconServerData;

  constructor(private mediconService: MediconService, private renderer: Renderer2) {}

  ngOnInit() {
    const width = this.elRefGraphArea.nativeElement.offsetWidth;
    const roundedWidth = width - (width % 60);  // to accommodate all variations of resolution intervals
    this.renderer.setProperty(this.elRefGraphArea.nativeElement, 'width', roundedWidth);
    this.mediconService.init(this.serverData, roundedWidth);
  }

  // getTimeline(resolution): MediconTimelineRange {
  //   const item = TimelineResolutionValues[resolution];
  //   const pivotEpoch = this.timeService.getMidnightEpoch(this.serverData.timeline.pivotTime.iso.substring(11, 16));
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
