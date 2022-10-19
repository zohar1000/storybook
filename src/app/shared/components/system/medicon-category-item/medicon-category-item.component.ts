import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Medication } from '@stories/models/medication.model';
import { MedicationsCategory, MediconTimeline } from '@models/medicon-data.model';
import { ExecutionType } from '@stories/enums/execution-type.enum';

@Component({
  selector: 'app-medicon-category-item',
  templateUrl: './medicon-category-item.component.html',
  styleUrls: ['./medicon-category-item.component.scss']
})
export class MediconCategoryItemComponent implements OnInit {
  @ViewChild('graphLine') elRefGraphLine;
  @ViewChild('name') elRefName;
  @Input() category: MedicationsCategory;
  @Input() medication: Medication;
  @Input() timeline: MediconTimeline;
  @Input() medicationNameWidth: number;
  @Input() timelineWidth: number;
  @Input() isCondensedCategory = false;
  @Input() isShowBottomBorder = false;
  readonly PARTS = 12;
  ExecutionType = ExecutionType;
  subDivisionLines;
  pivotTimePositionX;

  ngOnInit() {
    this.subDivisionLines = this.timeline.subDivision - 1;
    const pivotTimePositionPct = (this.timeline.pivotTime.epoch - this.timeline.range.fromEpoch) / (this.timeline.range.toEpoch - this.timeline.range.fromEpoch)
    this.pivotTimePositionX = pivotTimePositionPct * this.timelineWidth;
  }
}
