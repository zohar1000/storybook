import { Component, ElementRef, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MediconSection, MediconTimeline } from '@models/medicon-data.model';
import { MediconSectionType } from '@shared/enums/medicon-section-type.enum';

@Component({
  selector: 'app-medicon-section-container',
  templateUrl: './medicon-section-container.component.html',
  styleUrls: ['./medicon-section-container.component.scss']
})
export class MediconSectionContainerComponent implements OnInit {
  @Input() direction;
  @Input() text;
  @Input() section: MediconSection;
  @Input() timeline: MediconTimeline;
  @Input() preTimelineWidth = 0;
  @Input() timelineWidth = 0;
  MediconSectionType = MediconSectionType;
  timelineValuesWidth;
  timelineValuesRight;

  ngOnInit() {
    const valueWidth = this.timelineWidth / 12;
    this.timelineValuesWidth = valueWidth * this.timeline.xAxisValues.length;
    this.timelineValuesRight = -valueWidth / 2;
  }
}
