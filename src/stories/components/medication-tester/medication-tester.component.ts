import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Settings } from '@stories/models/settings.model';
import { ToastrService } from 'ngx-toastr';
import { MedicationsCategory, MedicationsConcentratedData, MedicationsSection } from '@models/medications-concentrated-data.model';
import { Direction } from '@stories/models/direction.model';

@Component({
  selector: 'app-medication-tester',
  templateUrl: './medication-tester.component.html',
  styleUrls: ['./medication-tester.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MedicationTesterComponent implements OnInit {
  @Input() text: any;
  @Input() direction: Direction;
  @Input() defaultSettings;
  settings: Settings;
  LOCAL_STORAGE_KEY = 'medicationsConfig';
  isShowSettings = false;
  accordionClass = 'settings-accordion';
  prevSettings;
  data: MedicationsConcentratedData;

  constructor(private cdr: ChangeDetectorRef, private toastr: ToastrService) {}

  ngOnInit() {
    setTimeout(() => {
      this.initSettings();
      // this.onClickSettings();
      this.buildData();
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
    this.toastr.success('Settings were saved');
    this.buildData();
  }

  getFromLocalStorage() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY);
  }

  clearLocalStorage() {
    return localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }

  onChangeSectionMedications(sectionIndex, medications) {
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

  buildData() {
    const getCategories = (medications): MedicationsCategory[] => {
      const categories = {};
      medications.forEach(medication => {
        if (!categories[medication.categoryId]) categories[medication.categoryId] = [];
        categories[medication.categoryId].push(medication);
      });
      const keys = Object.keys(categories);
      return keys.map((key, i) => ({
        id: Number(key),
        name: `category ${key}`,
        medications: categories[key]
      }));
    }

    const getSection = (section, i): MedicationsSection => {
      return {
        id: 1,
        name: `section ${i + 1}`,
        isDisplay: section.isDisplay,
        categories: getCategories(section.medications)
      }
    }

    this.data = {
      title: {
        fromTime: '2022-01-01 10:00',
        toTime: '2022-01-02 17:00',
      },
      sections: this.settings.sections.map((section, i) => getSection(section, i))
    }
  }
}
