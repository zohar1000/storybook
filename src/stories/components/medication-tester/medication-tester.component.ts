import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { textEn } from '@stories/const/text-en.const';
import { textHe } from '@stories/const/text-he.const';
import { ExecutionType } from '@stories/enums/execution-type.enum';

@Component({
  selector: 'app-medication-tester',
  templateUrl: './medication-tester.component.html',
  styleUrls: ['./medication-tester.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MedicationTesterComponent implements OnInit {
  text: any;
  settings;
  direction: string;
  LOCAL_STORAGE_KEY = 'medicationsConfig';
  isSettings = false;
  accordionClass = 'settings-accordion';
  prevSettings;

  ngOnInit() {
    setTimeout(() => {
      this.initConfig();
      this.setTextLanguage();
      this.onClickSettings();
    }, 50);
  }

  initConfig() {
    const item = this.getFromLocalStorage();
    this.settings = item ? JSON.parse(item) : this.settings = this.getDefaultSettings();
  }

  onClickResetTime(e) {
    this.settings.pivotTime = new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(new Date());
    this.saveToLocalStorage();
  }

  onChangePivotTime(e: Event) {
    this.settings.pivotTime = (e.target as any).value;
    if (this.settings.pivotTime.length === 2) this.settings.pivotTime += ':00';
    this.saveToLocalStorage();
  }

  onClickSettings() {
    this.prevSettings = JSON.parse(JSON.stringify(this.settings));
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
debugger;
    this.settings = this.prevSettings;
    this.isSettings = false;
    console.log(JSON.stringify(this.settings, null, 2));
  }

  saveToLocalStorage() {
    const item = JSON.stringify(this.settings);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, item);
    this.setTextLanguage();
    console.log('saving to ls:', JSON.stringify(this.settings.graphs[0].medications, null, 2));
  }

  getFromLocalStorage() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY);
  }

  setTextLanguage() {
    const text = this.settings.languageCode === 'en' ? textEn : textHe;
    this.text = text.text;
    this.direction = text.direction;
  }

  getConfig() {
    return typeof this.settings;
  }

  getPrevConfig() {
    return typeof this.prevSettings;
  }

  onChangeGraphMedications(medications, i) {
    this.settings.graphs[i].medications = medications;
  }

  getDefaultSettings() {
    return {
      languageCode: 'en',
      resolution: '1hour',
      pivotTime: '10:00',
      hoursForward: 14,
      hoursBackward: 5,
      refreshTime: 2,
      graphs: [
        {
          isDisplay: true,
          medications: [
            { id: 10, type: ExecutionType.OneTime, categoryId: 1 },
            { id: 11, type: ExecutionType.OneTime, categoryId: 1 },
          ]
        },
        {
          isDisplay: false,
          medications: []
        },
        {
          isDisplay: true,
          medications: []
        },
        {
          isDisplay: true,
          medications: []
        }
      ]
    }
  }
}
