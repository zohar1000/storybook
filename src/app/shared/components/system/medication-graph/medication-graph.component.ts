import { Component, Input, OnInit } from '@angular/core';
import { Medication } from '@stories/models/medication.model';

@Component({
  selector: 'app-medication-graph',
  templateUrl: './medication-graph.component.html',
  styleUrls: ['./medication-graph.component.scss']
})
export class MedicationGraphComponent implements OnInit {
  @Input() medication: Medication;

  constructor() { }

  ngOnInit(): void {
  }

}
