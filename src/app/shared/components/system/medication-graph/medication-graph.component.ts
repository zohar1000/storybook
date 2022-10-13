import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Medication } from '@stories/models/medication.model';
import { MedicationTimeline } from '@models/medications-concentrated-data.model';

@Component({
  selector: 'app-medication-graph',
  templateUrl: './medication-graph.component.html',
  styleUrls: ['./medication-graph.component.scss']
})
export class MedicationGraphComponent implements OnInit {
  @ViewChild('graphLine') elRefGraphLine;
  @ViewChild('name') elRefName;
  @Input() medication: Medication;
  @Input() timeline: MedicationTimeline;
  @Input() medicationNameWidth: number;
  @Input() timelineWidth: number;
  @Input() isCondensedCategory = false;
  parts;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.parts = this.timeline.xAxisValues.length - 1;
  }
}
