import { Component, Input, OnInit } from '@angular/core';
import { MediconLegendIcons } from '@shared/consts/medicon-legend-icons.const';
import { MediconLegendIconType } from '@shared/enums/medicon-legend-icon-type.enum';

@Component({
  selector: 'app-medicon-icon',
  templateUrl: './medicon-icon.component.html',
  styleUrls: ['./medicon-icon.component.scss']
})
export class MediconIconComponent implements OnInit {
  @Input() type: string;
  @Input() position = '';  // 'aligned' for regular, '' for 0,0 centered
  MediconLegendIconType = MediconLegendIconType;
  fontSize = 1;
  stroke = '';
  fill = 'white';

  ngOnInit(): void {
    const item = MediconLegendIcons.find(item => item.type === this.type);
    if (item.size) this.fontSize = item.size;
    if (item.stroke) this.stroke = item.stroke;
    if (item.fill) this.fill = item.fill;
  }
}
