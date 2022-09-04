import { Component, Input, OnInit } from '@angular/core';
import { MedicationsCategory } from '@models/medications-concentrated-data.model';

@Component({
  selector: 'app-medications-category',
  templateUrl: './medications-category.component.html',
  styleUrls: ['./medications-category.component.scss']
})
export class MedicationsCategoryComponent implements OnInit {
  @Input() category: MedicationsCategory;
  isExpanded = true;

  constructor() { }

  ngOnInit(): void {
  }

  onClickExpand() {
    this.isExpanded = true;
  }

  onClickCondense() {
    this.isExpanded = false;
  }
}
