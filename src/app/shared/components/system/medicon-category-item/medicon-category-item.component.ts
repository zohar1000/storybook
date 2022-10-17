import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Medication } from '@stories/models/medication.model';
import { MedicationsCategory, MedicationTimeline } from '@models/medicon-data.model';
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
  @Input() timeline: MedicationTimeline;
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
    this.pivotTimePositionX = this.timeline.pivotTimePositionPct * this.timelineWidth;
  }
}
