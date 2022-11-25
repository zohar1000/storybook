import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MedicationsCategory } from '@models/medicon-server-data.model';
import { MediconService } from '@shared/components/system/shared/services/medicon.service';

@Component({
  selector: 'app-medicon-timeline-graph',
  templateUrl: './medicon-timeline-graph.component.html',
  styleUrls: ['./medicon-timeline-graph.component.scss']
})
export class MediconTimelineGraphComponent implements OnInit {
  @ViewChild('graphLine') elRefGraphLine;
  @ViewChild('name') elRefName;
  @Input() categories: MedicationsCategory[];
  // @Input() timelineGraphWidth: number;
  // @Input() timelineRange: MediconTimelineRange;
  // @Input() timelineValues: MediconTimelineValues;
  @Input() set categoryStates(value) {
    this.onChangeCategoryStates(value);
  };
  // readonly PARTS = 12;
  // ExecutionType = ExecutionType;
  // subDivisionLines;
  // pivotTimePositionX;
  // fullWidth;
  // hardVerticalsWidth;
  // softVerticalsWidth;
  graphLinesCount;
  // fillerWidth;
  timelineGraphWidth;

  constructor(public mediconService: MediconService) {}

  ngOnInit() {
    // this.fullWidth = 16 / 12 * this.timelineGraphWidth;
    // const hardVerticalsWidth = this.fullWidth / 16;
    // this.hardVerticalsWidth = hardVerticalsWidth + 'px 100%';
    // this.softVerticalsWidth = hardVerticalsWidth / 6 + 'px 100%';
    // this.fillerWidth = this.fullWidth - this.timelineGraphWidth;
    this.timelineGraphWidth = this.mediconService.timelineMetrics.timelineWidth + 1;



    // this.calcFullWidth();

    // this.subDivisionLines = this.timelineValues.subDivision - 1;
    // const pivotTimePositionPct = (this.timelineRange.pivotTime.epoch - this.timelineRange.range.fromTimeEpoch) / (this.timelineRange.range.toTimeEpoch - this.timelineRange.range.fromTimeEpoch)
    // this.pivotTimePositionX = pivotTimePositionPct * this.timelineWidth;
  }

  calcFullWidth() {
    // for 24h
    this.graphLinesCount = 0;
    this.categories.forEach(category => {
      this.graphLinesCount += Math.max(category.medications.length, 1);
    });
    // this.medicationsCount += 'px';
  }

  onChangeCategoryStates(categoryStates) {
    this.graphLinesCount = 0;
    categoryStates.forEach(catState => {
      if (!catState.isExpanded) {
        this.graphLinesCount++;
      } else {
        const item = this.categories.find(cat => cat.id === catState.id);
        this.graphLinesCount += item.medications.length;
      }
    })
  }
}
