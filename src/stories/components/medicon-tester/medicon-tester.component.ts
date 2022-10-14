import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Settings } from '@stories/models/settings.model';
import { ToastrService } from 'ngx-toastr';
import { MedicationsCategory, MedicationsSection, MedicationTimeline, MediconData } from '@models/medicon-data.model';
import { Direction } from '@stories/models/direction.model';
import { MedicationCategories } from '@stories/const/medication-categories.const';
import { TimeDisplayType } from '@shared/enums/time-display-type.enum';
import { TimelineResolutionValues } from '@shared/consts/timeline-resolution-values.const';

@Component({
  selector: 'app-medicon-tester',
  templateUrl: './medicon-tester.component.html',
  styleUrls: ['./medicon-tester.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MediconTesterComponent implements OnInit {
  @Input() text: any;
  @Input() direction: Direction;
  @Input() defaultSettings: Settings;
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
      this.buildData();
      this.toastr.success('Settings were saved');
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
  }

  getTimeline(): MedicationTimeline {
    const ONE_HOUR_IN_MS = 3600000; // 1000 * 60 * 60
    const ONE_DAY_IN_MS = 86400000; // 1000 * 60 * 60 * 24
    const TimeFormatOptions = {
      date: { year: '2-digit', month: '2-digit', day: 'numeric' } as const,
      time: { hour: '2-digit', minute: '2-digit' } as const,
      dateTime: { year: '2-digit', month: '2-digit', day: 'numeric', hour: '2-digit', minute: '2-digit' } as const
    }
    const item = TimelineResolutionValues[this.settings.resolution];
    const now = Date.now();
    const dayStartTime = now - (now % ONE_DAY_IN_MS);
    const pivotHour = Number(this.settings.pivotTime.substring(0, 2));
    const pivotMinutes = Number(this.settings.pivotTime.substring(3, 5));
    const pivotTime = dayStartTime + (pivotHour * ONE_HOUR_IN_MS) + pivotMinutes * 60000;
    const roundBy = 60000 * item.minutes;
    const roundedPivotTime = pivotTime - (pivotTime % roundBy);
    const offset = (new Date()).getTimezoneOffset() * 60000;
    const roundedPivotLocalTime = roundedPivotTime + offset;
    const startTime = roundedPivotLocalTime - (6 * roundBy);
    const endTime = roundedPivotLocalTime + (6 * roundBy);
    const values = [];
    let interval = 0;
    for (let time = startTime; time <= endTime; time += roundBy) {
      let isoTime;
      const localTime = new Date(time);
      switch(item.type) {
        case TimeDisplayType.Time:
          values.push(localTime.toLocaleTimeString(this.settings.locale, TimeFormatOptions.time));
          break;
        case TimeDisplayType.Date:
          values.push(localTime.toLocaleDateString(this.settings.locale, TimeFormatOptions.date));
          break;
        case TimeDisplayType.DateTime:
          if (++interval % 2 !== 0) {
            isoTime = localTime.toLocaleString(this.settings.locale, TimeFormatOptions.dateTime);
            values.push(isoTime.substring(0, 8) + ' ' + isoTime.substring(10, 15));
          }
          break;
      }
    }
    return {
      range: {
        fromTime: values[0],
        toTime: values[12]
      },
      xAxisValues: values,
      subDivision: item.subDivision,
      interval: item.interval
    }
  }
}
