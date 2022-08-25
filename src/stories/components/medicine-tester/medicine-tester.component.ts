import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Direction } from '@stories/models/direction.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { GraphMetadata } from '@models/graph-metadata.model';
import { GraphData } from '@models/graph-data.model';
import { textEn } from '@stories/const/text-en.const';
import { textHe } from '@stories/const/text-he.const';

@Component({
  selector: 'app-medicine-tester',
  templateUrl: './medicine-tester.component.html',
  styleUrls: ['./medicine-tester.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MedicineTesterComponent implements OnInit {
  // @Input() direction: Direction;
  // @Input() text: any;
  // @Input() resolution: TimelineResolution;
  @Input() metadata: GraphMetadata;
  @Input() data: GraphData;

  text: any;
  direction: string;
  LOCAL_STORAGE_KEY = 'medicationsConfig';
  isSettings = false;
  accordionClass = 'settings-accordion';
  config = {
    languageCode: 'en',
    resolution: '1hour',
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

  ngOnInit() {
    this.initConfig();
    this.setTextLanguage();
    this.onClickSettings();
  }

  initConfig() {
    const item = this.getFromLocalStorage();
    if (item) this.config = JSON.parse(item);
  }

  onClickResetTime(e) {
    this.config.pivotTime = new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(new Date());
    this.saveToLocalStorage();
  }

  onChangePivotTime(e: Event) {
    this.config.pivotTime = (e.target as any).value;
    if (this.config.pivotTime.length === 2) this.config.pivotTime += ':00';
    this.saveToLocalStorage();
  }

  onClickSettings() {
    this.prevConfig = JSON.parse(JSON.stringify(this.config));
    this.isSettings = true;
  }

  onChangeResolution(e) {
    this.saveToLocalStorage();
  }

  onClickSaveSettings() {
    this.saveToLocalStorage();
    this.isSettings = false;
  }

  onClickCancelSettings() {
    this.config = this.prevConfig;
    this.isSettings = false;
    console.log(JSON.stringify(this.config, null, 2));
  }

  saveToLocalStorage() {
    const item = JSON.stringify(this.config);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, item);
    this.setTextLanguage();
    // console.log('saving to ls:', JSON.stringify(this.config, null, 2));
  }

  getFromLocalStorage() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY);
  }

  setTextLanguage() {
    const text = this.config.languageCode === 'en' ? textEn : textHe;
    this.text = text.text;
    this.direction = text.direction;
  }
}
