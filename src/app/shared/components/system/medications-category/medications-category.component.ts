import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicationsCategory, MedicationTimeline } from '@models/medications-concentrated-data.model';

@Component({
  selector: 'app-medications-category',
  templateUrl: './medications-category.component.html',
  styleUrls: ['./medications-category.component.scss']
})
export class MedicationsCategoryComponent {
  @Input() category: MedicationsCategory;
  @Input() timeline: MedicationTimeline;
  @Output() expandCondense = new EventEmitter();
  @Output() backgroundColored = new EventEmitter();
  @Output() timelineWidth = new EventEmitter<number>();
  isExpanded = true;

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

  onTimelineWidth(width, graphIx) {
    console.log('width:', width, graphIx);
    if (graphIx === 0) this.timelineWidth.emit(width);
  }
}
