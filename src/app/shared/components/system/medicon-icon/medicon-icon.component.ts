import { Component, Input, OnInit } from '@angular/core';
import { MediconLegendIcons } from '@shared/consts/medicon-legend-icons.const';

@Component({
  selector: 'app-medicon-icon',
  templateUrl: './medicon-icon.component.html',
  styleUrls: ['./medicon-icon.component.scss']
})
export class MediconIconComponent implements OnInit {
  @Input() type: string;
  @Input() position = '';  // 'aligned' for regular, '' for 0,0 centered
  iconClass;
  outlineColor = 'black';
  fontSize = 1;
  marginLeft = 0;
  svgs = [
    { }
  ]

  ngOnInit(): void {
    const item = MediconLegendIcons.find(item => item.type === this.type);
    this.iconClass = item.iconClass;
    if (item.outlineColor) this.outlineColor = item.outlineColor;
console.log('item.outlineColor:', item.outlineColor);
    if (item.size) {
      this.fontSize = item.size;
      this.marginLeft = (1 - item.size) / 2;
    }
  }
}
