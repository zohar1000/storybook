import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MedicationsCategory, MedicationTimeline } from '@models/medications-concentrated-data.model';

@Component({
  selector: 'app-medications-category',
  templateUrl: './medications-category.component.html',
  styleUrls: ['./medications-category.component.scss']
})
export class MedicationsCategoryComponent implements OnInit {
  @Input() category: MedicationsCategory;
  @Input() timeline: MedicationTimeline;
  @Input() preTimelineWidth = 0;
  @Input() timelineWidth = 0;
  @Output() expandCondense = new EventEmitter();
  @Output() backgroundColored = new EventEmitter();
  readonly expandIconWidth = 15;
  readonly frameWidth = 10;
  medicationNameWidth;
  isExpanded = true;

  ngOnInit() {
    this.medicationNameWidth = this.preTimelineWidth - this.expandIconWidth - this.frameWidth;
  }

  onClickExpand() {
    this.emitExpandCondense(true);
  }

  onClickCondense() {
    this.emitExpandCondense(false);
  }

  emitExpandCondense(isExpanded) {
    this.isExpanded = isExpanded;
    setTimeout(() => this.expandCondense.emit());  // timeout b/c dom hasn't changed yet
  }
}
