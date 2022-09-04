import { Component, Input } from '@angular/core';
import { GraphMetadata } from '@models/graph-metadata.model';
import { Direction } from '@stories/models/direction.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { MedicationsConcentratedData } from '@models/medications-concentrated-data.model';

@Component({
  selector: 'app-medications-concentrated',
  templateUrl: './medications-concentrated.component.html',
  styleUrls: ['./medications-concentrated.component.scss']
})
export class MedicationsConcentratedComponent {
  @Input() direction: Direction;
  @Input() text: any;
  @Input() resolution: TimelineResolution;
  @Input() metadata: GraphMetadata;
  @Input() data: MedicationsConcentratedData;

}
