import { Component, Input, OnInit } from '@angular/core';
import { Medication } from '@stories/models/medication.model';
import { MediconTimeline } from '@models/medicon-data.model';

@Component({
  selector: 'app-medicon-execution-continuous',
  templateUrl: './medicon-execution-continuous.component.html',
  styleUrls: ['./medicon-execution-continuous.component.scss']
})
export class MediconExecutionContinuousComponent implements OnInit {
  @Input() timeline: MediconTimeline;
  @Input() medication: Medication;
  @Input() timelineWidth;
  orderMargin;

  constructor() { }

  ngOnInit(): void {
    console.log('range:', this.timeline);
    console.log('medication:', this.medication);
    const orderEpoch = this.timeline.pivotTime.epoch + (this.medication.orderTime * 60000);
    const orderPct = this.getTimelinePct(this.timeline.range.fromEpoch, this.timeline.range.toEpoch, orderEpoch);
    console.log('order pct:', orderPct);
    this.orderMargin = this.timelineWidth * orderPct;
    // console.log('orderPadding:', orderPadding);
  }

  ngAfterViewInit() {
    console.log('avi');
  }

  getTimelinePct(from, to, pos) {
    return (pos - from) / (to - from);
  }
}
