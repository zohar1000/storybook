import { Component, ElementRef, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MedicationsSection, MedicationTimeline } from '@models/medications-concentrated-data.model';
import { MedicationsSectionType } from '@shared/enums/medications-section-type.enum';

@Component({
  selector: 'app-medications-section-container',
  templateUrl: './medications-section-container.component.html',
  styleUrls: ['./medications-section-container.component.scss']
})
export class MedicationsSectionContainerComponent implements OnInit {
  @Input() text;
  @Input() section: MedicationsSection;
  @Input() timeline: MedicationTimeline;
  @Input() preTimelineWidth = 0;
  @Input() timelineWidth = 0;
  MedicationsSectionType = MedicationsSectionType;
  timelineValuesWidth;
  timelineValuesRight;

  ngOnInit() {
    const valueWidth = this.timelineWidth / 12;
    this.timelineValuesWidth = valueWidth * this.timeline.xAxisValues.length;
    this.timelineValuesRight = -valueWidth / 2;
  }
}
