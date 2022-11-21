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
  @Input() categories: MedicationsCategory[];
  @Input() timelineGraphWidth: number;
  @Input() timelineRange: MediconTimelineRange;
  @Input() timelineValues: MediconTimelineValues;
  @Input() set categoryStates(value) {
    if (this.fullWidth) this.onChangeCategoryStates(value);
  };
  readonly PARTS = 12;
  ExecutionType = ExecutionType;
  subDivisionLines;
  pivotTimePositionX;
  fullWidth;
  hardVerticalsWidth;
  softVerticalsWidth;
  medicationsCount;
  fillerWidth;

  ngOnInit() {
    this.calcFullWidth();

    // this.subDivisionLines = this.timelineValues.subDivision - 1;
    // const pivotTimePositionPct = (this.timelineRange.pivotTime.epoch - this.timelineRange.range.fromTimeEpoch) / (this.timelineRange.range.toTimeEpoch - this.timelineRange.range.fromTimeEpoch)
    // this.pivotTimePositionX = pivotTimePositionPct * this.timelineWidth;
  }

  calcFullWidth() {
    // for 24h
    this.fullWidth = 16 / 12 * this.timelineGraphWidth;
    const hardVerticalsWidth = this.fullWidth / 16;
    this.hardVerticalsWidth = hardVerticalsWidth + 'px 100%';
    this.softVerticalsWidth = hardVerticalsWidth / 6 + 'px 100%';
    this.fillerWidth = this.fullWidth - this.timelineGraphWidth;
    this.timelineGraphWidth++;

console.log('this.timelineGraphWidth:', this.timelineGraphWidth);
console.log('hardVerticalsWidth:', hardVerticalsWidth);
console.log('this.fullWidth:', this.fullWidth);
console.log('this.hardVerticalsWidth:', this.hardVerticalsWidth);

console.log('window.innerWidth, document.body.clientWidth:', window.innerWidth, document.body.clientWidth);
console.log('categories:', this.categories);
console.log('this.fillerWidth:', this.fillerWidth);
    this.medicationsCount = 0;
    this.categories.forEach(category => {
      this.medicationsCount += Math.max(category.medications.length, 1);
    });
    // this.medicationsCount += 'px';
  }

  onChangeCategoryStates(categoryStates) {
    this.medicationsCount = 0;
    categoryStates.forEach(catState => {
      if (!catState.isExpanded) {
        this.medicationsCount++;
      } else {
        const item = this.categories.find(cat => cat.id === catState.id);
        this.medicationsCount += item.medications.length;
      }
    })
  }
}
