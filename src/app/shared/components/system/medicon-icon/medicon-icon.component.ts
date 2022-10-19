import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicon-icon',
  templateUrl: './medicon-icon.component.html',
  styleUrls: ['./medicon-icon.component.scss']
})
export class MediconIconComponent implements OnInit {
  @Input() type: string;

  iconClass = 'bi-square';

  constructor() { }

  ngOnInit(): void {
  }

}
