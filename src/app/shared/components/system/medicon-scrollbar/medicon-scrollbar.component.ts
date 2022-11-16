import { Component, Input, OnInit } from '@angular/core';
import { MediconTimeline } from '@models/medicon-data.model';

@Component({
  selector: 'app-medicon-scrollbar',
  templateUrl: './medicon-scrollbar.component.html',
  styleUrls: ['./medicon-scrollbar.component.scss']
})
export class MediconScrollbarComponent implements OnInit {
  @Input() timeline: MediconTimeline;
  @Input() preTimelineWidth = 0;
  @Input() timelineWidth = 0;
  fullWidth;

  ngOnInit(): void {
this.fullWidth = this.timelineWidth * this.timeline.days;
  }

}
