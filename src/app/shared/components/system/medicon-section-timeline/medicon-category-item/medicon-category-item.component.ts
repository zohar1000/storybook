import { Component, Input } from '@angular/core';
import { Medication } from '@stories/models/medication.model';
import { MedicationsCategory } from '@models/medicon-server-data.model';

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
