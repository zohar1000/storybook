import { Component, Input, OnInit } from '@angular/core';
import { MedicationsSection } from '@models/medications-concentrated-data.model';

@Component({
  selector: 'app-medications-section',
  templateUrl: './medications-section.component.html',
  styleUrls: ['./medications-section.component.scss']
})
export class MedicationsSectionComponent implements OnInit {
  @Input() section: MedicationsSection;

  constructor() { }

  ngOnInit(): void {
  }

}
