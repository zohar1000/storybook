import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MedicationsCategory, MediconTimelineRange, MediconTimelineValues } from '@models/medicon-server-data.model';
import { ExecutionType } from '@stories/enums/execution-type.enum';
import { Medication } from '@stories/models/medication.model';

@Component({
  selector: 'app-medicon-timeline-graph',
  templateUrl: './medicon-timeline-graph.component.html',
  styleUrls: ['./medicon-timeline-graph.component.scss']
})
export class MediconTimelineGraphComponent implements OnInit {
  @ViewChild('graphLine') elRefGraphLine;
  @ViewChild('name') elRefName;
  @Input() category: MedicationsCategory;
  @Input() medication: Medication;
  @Input() timelineRange: MediconTimelineRange;
  @Input() timelineValues: MediconTimelineValues;
  @Input() medicationNameWidth: number;
  @Input() timelineWidth: number;
  @Input() isCondensedCategory = false;
  @Input() isShowBottomBorder = false;
  readonly PARTS = 12;
  ExecutionType = ExecutionType;
  subDivisionLines;
  pivotTimePositionX;

  ngOnInit() {
    this.subDivisionLines = this.timelineValues.subDivision - 1;
    const pivotTimePositionPct = (this.timelineRange.pivotTime.epoch - this.timelineRange.range.fromTimeEpoch) / (this.timelineRange.range.toTimeEpoch - this.timelineRange.range.fromTimeEpoch)
    this.pivotTimePositionX = pivotTimePositionPct * this.timelineWidth;
  }
}
