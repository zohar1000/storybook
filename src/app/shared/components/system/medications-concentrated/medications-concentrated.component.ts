import { Component, Input, OnInit } from '@angular/core';
import { GraphMetadata } from '@models/graph-metadata.model';
import { Direction } from '@stories/models/direction.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { MedicationsConcentratedData } from '@models/medications-concentrated-data.model';

@Component({
  selector: 'app-medications-concentrated',
  templateUrl: './medications-concentrated.component.html',
  styleUrls: ['./medications-concentrated.component.scss']
})
export class MedicationsConcentratedComponent implements OnInit {
  @Input() direction: Direction;
  @Input() text: any;
  @Input() resolution: TimelineResolution;
  @Input() metadata: GraphMetadata;
  @Input() data: MedicationsConcentratedData;

  ngOnInit() {
    // this.data = this.getDefaultData();
    console.log('data:', this.data);
  }

  getDefaultData(): MedicationsConcentratedData {
    return {
      title: {
        fromTime: '2022-01-01 10:00',
        toTime: '2022-01-02 17:00',
      },
      sections: []
    }
  }

  dd(e) {
    console.log('e:', e);
    alert('ss')
  }

}
