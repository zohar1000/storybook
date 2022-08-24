import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Direction } from '@stories/models/direction.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { GraphMetadata } from '@models/graph-metadata.model';
import { GraphData } from '@models/graph-data.model';

@Component({
  selector: 'app-medicine-tester',
  templateUrl: './medicine-tester.component.html',
  styleUrls: ['./medicine-tester.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MedicineTesterComponent {
  @Input() direction: Direction;
  @Input() text: any;
  @Input() resolution: TimelineResolution;
  @Input() metadata: GraphMetadata;
  @Input() data: GraphData;

  LOCAL_STORAGE_KEY = 'medicationsConfig';
  isSettings = false;
  accordionClass = 'settings-accordion';
  config = {
    pivotTime: '10:00',
    hoursForward: 14,
    hoursBackward: 5,
    refreshTime: 2,
    graphs: [
      { isDisplay: true },
      { isDisplay: false },
      { isDisplay: true },
      { isDisplay: true }
    ]
  }
  prevConfig;

  constructor() {
    this.initConfig();
    this.onClickSettings();
  }

  initConfig() {
    const item = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (item) this.config = JSON.parse(item);
  }

  onClickResetTime(e) {
    this.config.pivotTime = new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(new Date());
  }

  onChangePivotTime(e: Event) {
    this.config.pivotTime = (e.target as any).value;
    if (this.config.pivotTime.length === 2) this.config.pivotTime += ':00';
  }

  onClickSettings() {
    this.prevConfig = JSON.parse(JSON.stringify(this.config));
    this.isSettings = true;
  }

  onChangeResolution(e) {

  }

  onClickSaveSettings() {
    const item = JSON.stringify(this.config);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, item);
    console.log(JSON.stringify(this.config, null, 2));
    this.isSettings = false;
  }

  onClickCancelSettings() {
    this.config = this.prevConfig;
    this.isSettings = false;
    console.log(JSON.stringify(this.config, null, 2));
  }


}
