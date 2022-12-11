import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { Direction } from '@stories/models/direction.model';
import { MediconServerData } from '@models/medicon-server-data.model';
import { MediconService } from '@shared/components/system/shared/services/medicon.service';
import { Subscription } from 'rxjs';
import { MediconTimelineMetrics } from '@models/timeline-metrics.model';
import { TimeService } from '@shared/services/time.service';
import { TimeDisplayType } from '@shared/enums/time-display-type.enum';

// TODO:
// 1. onPush


@Component({
  selector: 'app-medicon',
  templateUrl: './medicon.component.html',
  styleUrls: ['./medicon.component.scss']
})
export class MediconComponent {
  @ViewChild('header', { static: true }) elRefHeader: ElementRef;
  @ViewChild('graphArea', { static: true }) elRefGraphArea: ElementRef;
  @Input() direction: Direction;
  @Input() text: any;
  @Input()
  get serverData() {
    return this._serverData;
  }
  set serverData(value: MediconServerData) {
    this._serverData = value;
    this.onServerDataChange();
  }
  _serverData: MediconServerData;
  title;

  constructor(
    private mediconService: MediconService,
    private renderer: Renderer2,
    private timeService: TimeService) {}

  ngOnInit() {
    const width = this.elRefGraphArea.nativeElement.offsetWidth;
    const roundedWidth = width - (width % 60);  // to accommodate all variations of resolution intervals
    this.renderer.setProperty(this.elRefGraphArea.nativeElement, 'width', roundedWidth);
    this.mediconService.init(this.serverData, roundedWidth);
  }

  onServerDataChange(graphAreaWidth = 0) {
    this.setTitle();
    this.mediconService.init(this.serverData, graphAreaWidth);
  }

  setTitle() {
    const from = this.timeService.gmtToEpoch(this._serverData.title.fromTimeGmt);
    const to = this.timeService.gmtToEpoch(this._serverData.title.toTimeGmt);
    const formattedFrom = this.timeService.getFormattedTime(TimeDisplayType.DateTime, from);
    const formattedTo = this.timeService.getFormattedTime(TimeDisplayType.DateTime, to);
    this.title = `${formattedFrom} - ${formattedTo}`;
  }
}
