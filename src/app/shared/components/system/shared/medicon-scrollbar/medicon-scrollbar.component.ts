import { Component, Input, OnInit } from '@angular/core';
import { MediconTimelineRange } from '@models/medicon-server-data.model';

@Component({
  selector: 'app-medicon-scrollbar',
  templateUrl: './medicon-scrollbar.component.html',
  styleUrls: ['./medicon-scrollbar.component.scss']
})
export class MediconScrollbarComponent implements OnInit {
  @Input() timelineRange: MediconTimelineRange;
  @Input() medicationsAreaWidth = 0;
  @Input() timelineWidth = 0;
  fullWidth;

  ngOnInit(): void {
this.fullWidth = this.timelineWidth * this.timelineRange.days;
  }

}
