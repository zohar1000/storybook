import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Medication } from '@stories/models/medication.model';
import { MedicationsCategory, MediconTimelineRange } from '@models/medicon-server-data.model';
import { ExecutionType } from '@stories/enums/execution-type.enum';

@Component({
  selector: 'app-medicon-category-item',
  templateUrl: './medicon-category-item.component.html',
  styleUrls: ['./medicon-category-item.component.scss']
})
export class MediconCategoryItemComponent {
  @Input() category: MedicationsCategory;
  @Input() medication: Medication;
  @Input() isCondensedCategory;
}
