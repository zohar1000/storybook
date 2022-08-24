import { Component, Input } from '@angular/core';
import { GraphMetadata } from '@models/graph-metadata.model';
import { GraphData } from '@models/graph-data.model';
import { Direction } from '@stories/models/direction.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent {
  @Input() direction: Direction;
  @Input() text: any;
  @Input() resolution: TimelineResolution;
  @Input() metadata: GraphMetadata;
  @Input() data: GraphData;

  dd(e) {
    console.log('e:', e);
    alert('ss')
  }

}
