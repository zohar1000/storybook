import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-medication-tester',
  templateUrl: './medication-tester.component.html',
  styleUrls: ['./medication-tester.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MedicationTesterComponent implements OnInit {
  @Input() text: any;
  @Input() direction: string;
  @Input() defaultSettings;
  settings;
  LOCAL_STORAGE_KEY = 'medicationsConfig';
  isSettings = false;
  accordionClass = 'settings-accordion';
  prevSettings;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.initSettings();
      this.onClickSettings();
    }, 50);
  }

  initSettings() {
    const item = this.getFromLocalStorage();
    this.settings = item ? JSON.parse(item) : JSON.parse(JSON.stringify(this.defaultSettings));
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
    console.log('saving to ls:', JSON.stringify(this.settings.graphs[0].medications, null, 2));
  }

  getFromLocalStorage() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY);
  }

  clearLocalStorage() {
    return localStorage.removeItem(this.LOCAL_STORAGE_KEY);
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

  onClickDefaultSettings() {
    const isClear = confirm('are you sure');
    if (isClear) {
      this.clearLocalStorage();
      this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
      this.cdr.detectChanges();
    }
  }
}
