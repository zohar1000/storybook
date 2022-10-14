import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Medication } from '@stories/models/medication.model';
import { MedicationTimeline } from '@models/medicon-data.model';

@Component({
  selector: 'app-medicon-category-item',
  templateUrl: './medicon-category-item.component.html',
  styleUrls: ['./medicon-category-item.component.scss']
})
export class MediconCategoryItemComponent implements OnInit {
  @ViewChild('graphLine') elRefGraphLine;
  @ViewChild('name') elRefName;
  @Input() medication: Medication;
  @Input() timeline: MedicationTimeline;
  @Input() medicationNameWidth: number;
  @Input() timelineWidth: number;
  @Input() isCondensedCategory = false;
  @Input() isShowBottomBorder = false;
  @Input() categoryName = '';
  @Input() categoryColor = '';
  parts;

  ngOnInit() {
    this.parts = this.timeline.xAxisValues.length - 1;
  }
}
