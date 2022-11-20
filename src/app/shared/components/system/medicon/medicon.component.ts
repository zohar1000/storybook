import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Direction } from '@stories/models/direction.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { MediconServerData, MediconTimelineValues, MediconTimelineRange } from '@models/medicon-server-data.model';
import { TimelineResolutionValues } from '@shared/consts/timeline-resolution-values.const';
import { TimeDisplayType } from '@shared/enums/time-display-type.enum';
import { TimeService } from '@shared/services/time.service';

@Component({
  selector: 'app-medicon',
  templateUrl: './medicon.component.html',
  styleUrls: ['./medicon.component.scss']
})
export class MediconComponent {
  @ViewChild('content') elContent: ElementRef;
  @Input() direction: Direction;
  @Input() text: any;
  @Input() serverData: MediconServerData;
  @Output() changeResolution = new EventEmitter<TimelineResolution>();
  timelineValues: MediconTimelineValues;

  constructor(private cdr: ChangeDetectorRef, private timeService: TimeService) {}

  ngOnInit() {
    this.calcTimelineValues(this.serverData.resolution);
  }

  onChangeResolution(resolution) {
    // this.resolution.emit(this.data.resolution);
    // this.serverData.timeline = this.getTimeline(resolution);
    this.calcTimelineValues(resolution)
    this.changeResolution.emit(resolution);
  }

  calcTimelineValues(resolution) {
    const item = TimelineResolutionValues[resolution];
    this.timelineValues = {
      resolution,
      xAxisValues: [],
      subDivision: item.subDivision,
      interval: item.interval,
    }
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
