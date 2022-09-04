import { Component, Input, OnInit } from '@angular/core';
import { MedicationsCategory } from '@models/medications-concentrated-data.model';

@Component({
  selector: 'app-medications-category',
  templateUrl: './medications-category.component.html',
  styleUrls: ['./medications-category.component.scss']
})
export class MedicationsCategoryComponent implements OnInit {
  @Input() category: MedicationsCategory;

  constructor() { }

  ngOnInit(): void {
  }

}
