import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Medication } from '@stories/models/medication.model';
import { MedicationTimeline } from '@models/medications-concentrated-data.model';

@Component({
  selector: 'app-medication-graph',
  templateUrl: './medication-graph.component.html',
  styleUrls: ['./medication-graph.component.scss']
})
export class MedicationGraphComponent implements OnInit, AfterViewInit {
  @ViewChild('graphContainer') elRefGraphContainer;
  @ViewChild('graphLine') elRefGraphLine;
  @ViewChild('name') elRefName;
  @Input() medication: Medication;
  @Input() timeline: MedicationTimeline;
  @Input() isCondensedCategory;
  @Output() timelineWidth = new EventEmitter<number>();
  parts;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.parts = this.timeline.xAxisValues.length - 1;
    console.log('timeline:', this.timeline.xAxisValues);
  }

  ngAfterViewInit() {
    const el = this.elRefGraphLine.nativeElement;
    const availWidth = this.elRefGraphLine.nativeElement.clientWidth - this.elRefName.nativeElement.clientWidth
    const width = availWidth - availWidth % this.timeline.xAxisValues.length;
    this.renderer.setStyle(this.elRefGraphContainer.nativeElement, 'width', `${width}px`);
    this.timelineWidth.emit(width);
  }
}
