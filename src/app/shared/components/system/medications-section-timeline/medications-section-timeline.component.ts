import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicationsSection, MedicationTimeline } from '@models/medications-concentrated-data.model';

@Component({
  selector: 'app-medications-section-timeline',
  templateUrl: './medications-section-timeline.component.html',
  styleUrls: ['./medications-section-timeline.component.scss']
})
export class MedicationsSectionTimelineComponent {
  @Input() section: MedicationsSection;
  @Input() timeline: MedicationTimeline;
  @Input() preTimelineWidth = 0;
  @Input() timelineWidth = 0;
  @Output() backgroundColored = new EventEmitter();

  onExpandCondense() {

  }
}
