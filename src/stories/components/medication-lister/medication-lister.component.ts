import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-medication-lister',
  templateUrl: './medication-lister.component.html',
  styleUrls: ['./medication-lister.component.scss']
})
export class MedicationListerComponent implements OnInit {
  @Input() medications;

  constructor() { }

  ngOnInit(): void {
  }

}
