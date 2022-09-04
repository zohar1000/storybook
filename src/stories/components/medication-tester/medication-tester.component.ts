import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Settings } from '@stories/models/settings.model';

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
  settings: Settings;
  LOCAL_STORAGE_KEY = 'medicationsConfig';
  isShowSettings = false;
  accordionClass = 'settings-accordion';
  prevSettings;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.initSettings();
      // this.onClickSettings();
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
    this.isShowSettings = true;
  }

  onChangeResolution(e) {
    this.saveToLocalStorage();
  }

  onClickSaveSettings() {
    this.saveToLocalStorage();
    this.isShowSettings = false;
  }

  onClickCancelSettings() {
    this.settings = this.prevSettings;
    this.isShowSettings = false;
    console.log(JSON.stringify(this.settings, null, 2));
  }

  saveToLocalStorage() {
    const item = JSON.stringify(this.settings);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, item);
    console.log('saving to ls:', JSON.stringify(this.settings.sections[0].medications, null, 2));
  }

  getFromLocalStorage() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY);
  }

  clearLocalStorage() {
    return localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }

  onChangeSectionMedications(sectionIndex, medications) {
console.log('onChangeSectionMedications:', sectionIndex, medications);
    this.settings.sections[sectionIndex].medications = medications;
  }

  onClickDefaultSettings() {
    const isClear = confirm('are you sure');
    if (isClear) {
      this.clearLocalStorage();
      this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
      this.cdr.detectChanges();
    }
  }

  onDeleteMedication(sectionIndex, medicationId) {
    const medications = this.settings.sections[sectionIndex].medications;
    this.settings.sections[sectionIndex].medications = medications.filter(medication => medication.id !== medicationId);
    this.cdr.detectChanges();
  }
}
