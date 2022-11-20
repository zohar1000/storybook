import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MedicationsCategory, MediconTimelineRange } from '@models/medicon-server-data.model';

@Component({
  selector: 'app-medicon-category',
  templateUrl: './medicon-category.component.html',
  styleUrls: ['./medicon-category.component.scss']
})
export class MediconCategoryComponent {
  @Input() category: MedicationsCategory;
  @Output() expandCondense = new EventEmitter();
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
}
