import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-medication-lister-item',
  templateUrl: './medication-lister-item.component.html',
  styleUrls: ['./medication-lister-item.component.scss']
})
export class MedicationListerItemComponent implements OnInit {
  @Input() medication;


  constructor() { }

  ngOnInit(): void {
  }

}
