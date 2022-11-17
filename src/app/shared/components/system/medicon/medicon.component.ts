import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GraphMetadata } from '@models/graph-metadata.model';
import { Direction } from '@stories/models/direction.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { MediconServerData } from '@models/medicon-server-data.model';

@Component({
  selector: 'app-medicon',
  templateUrl: './medicon.component.html',
  styleUrls: ['./medicon.component.scss']
})
export class MediconComponent implements AfterViewInit {
  @ViewChild('content') elContent: ElementRef;
  @Input() direction: Direction;
  @Input() text: any;
  @Input() metadata: GraphMetadata;
  @Input() serverData: MediconServerData;
  @Output() changeResolution = new EventEmitter<TimelineResolution>();
  readonly TIMELINE_WIDTH_PCT = 0.8;  // total width for graph on the right side - 80%
  readonly TIMELINE_WIDTH_REDUCTION_PCT = 0.95;  // take off 5% to display the right most hour
  preTimelineWidth = 0;
  timelineWidth = 0;
  resolution: TimelineResolution;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.resolution = this.serverData.resolution;
  }

  ngAfterViewInit() {
    this.setTimelineWidth();
  }

  setTimelineWidth() {
    const contentWidth = this.elContent.nativeElement.offsetWidth;
    const timelineWidth = Math.floor(contentWidth * this.TIMELINE_WIDTH_PCT);
    this.preTimelineWidth = contentWidth - timelineWidth;
    // this.timelineWidth =  Math.floor(timelineWidth * this.TIMELINE_WIDTH_REDUCTION_PCT);
    this.timelineWidth =  Math.floor(timelineWidth) - 70;
    this.cdr.detectChanges();
  }

  onChangeResolution(resolution) {
    // this.resolution.emit(this.data.resolution);
    this.changeResolution.emit(resolution);
  }
}
