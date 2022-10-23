import { Component, Input, OnInit } from '@angular/core';
import { MediconLegendIcons } from '@shared/consts/medicon-legend-icons.const';

@Component({
  selector: 'app-medicon-icon',
  templateUrl: './medicon-icon.component.html',
  styleUrls: ['./medicon-icon.component.scss']
})
export class MediconIconComponent implements OnInit {
  @Input() type: string;
  iconClass;

  ngOnInit(): void {
    this.iconClass = MediconLegendIcons[0][this.type] || MediconLegendIcons[1][this.type];
  }
}
