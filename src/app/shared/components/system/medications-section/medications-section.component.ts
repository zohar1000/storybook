import { Component, Input } from '@angular/core';
import { MedicationsSection } from '@models/medications-concentrated-data.model';

@Component({
  selector: 'app-medications-section',
  templateUrl: './medications-section.component.html',
  styleUrls: ['./medications-section.component.scss']
})
export class MedicationsSectionComponent {
  @Input() section: MedicationsSection;
}
