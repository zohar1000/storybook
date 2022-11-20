import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MediconSection, MediconTimelineRange, MediconTimelineValues } from '@models/medicon-server-data.model';
import { MediconSectionType } from '@shared/enums/medicon-section-type.enum';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';

@Component({
  selector: 'app-medicon-section-container',
  templateUrl: './medicon-section-container.component.html',
  styleUrls: ['./medicon-section-container.component.scss']
})
export class MediconSectionContainerComponent {
  @Input() direction;
  @Input() text;
  @Input() section: MediconSection;
  @Input() timelineRange: MediconTimelineRange;
  @Input() timelineValues: MediconTimelineValues;
  @Output() changeResolution = new EventEmitter();
  MediconSectionType = MediconSectionType;

  onChangeResolution(resolution) {
    this.changeResolution.emit(resolution);
  }
}
