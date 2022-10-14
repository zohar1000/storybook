import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Settings } from '@stories/models/settings.model';
import { ToastrService } from 'ngx-toastr';
import { MedicationsCategory, MediconData, MedicationsSection, MedicationTimeline } from '@models/medicon-data.model';
import { Direction } from '@stories/models/direction.model';
import { MedicationCategories } from '@stories/const/medication-categories.const';

@Component({
  selector: 'app-medicon-tester',
  templateUrl: './medicon-tester.component.html',
  styleUrls: ['./medicon-tester.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MediconTesterComponent implements OnInit {
  @Input() text: any;
  @Input() direction: Direction;
  @Input() defaultSettings;
  settings: Settings;
  LOCAL_STORAGE_KEY = 'medicationsSettings';
  isShowSettings = false;
  accordionClass = 'settings-accordion';
  prevSettings;
  data: MediconData;

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

  onChangeResolution(resolution) {
    this.settings.resolution = resolution;
    this.saveToLocalStorage();
  }

  onClickSaveSettings() {
    this.saveToLocalStorage();
    this.isShowSettings = false;
  }

  onClickCancelSettings() {
    this.settings = this.prevSettings;
    this.isShowSettings = false;
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
      const ids = Object.keys(categories).map(id => Number(id));
      return ids.map(id => ({
        id: id,
        name: `category ${id}`,
        color: MedicationCategories.find(item => item.id === id).color,
        medications: categories[id]
      }));
    }

    const getSection = (section, i): MedicationsSection => {
      return {
        id: 1,
        type: section.type,
        name: this.text.graphSections[i].title,
        isDisplay: section.isDisplay,
        categories: getCategories(section.medications)
      }
    }

    this.data = {
      title: {
        fromTime: '2022-01-01 10:00',
        toTime: '2022-01-02 17:00',
      },
      resolution: this.settings.resolution,
      sections: this.settings.sections.map((section, i) => getSection(section, i)),
      timeline: this.getTimeline()
    }

    this.getTimeline();
console.log('this.data:', this.data);
  }

  getTimeline(): MedicationTimeline {
    const currHour = Number(this.settings.pivotTime.substring(0, 2));
    const hours = [];
    for (let i = -6; i <= 6; i++) {
      let hour = currHour + i;
      if (hour < 0) hour += 24;
      hours.push(String(hour).padStart(2, '0') + ':00');
    }
    // console.log('hours:', hours);
    return {
      range: {
        fromTime: hours[0],
        toTime: hours[12]
      },
      xAxisValues: hours
    }
  }
}
