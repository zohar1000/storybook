import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Settings } from '@stories/models/settings.model';
import { ToastrService } from 'ngx-toastr';
import { MedicationsCategory, MediconSection, MediconServerTimelineRange, MediconServerData } from '@models/medicon-server-data.model';
import { Direction } from '@stories/models/direction.model';
import { MedicationCategories } from '@stories/const/medication-categories.const';
import { TimeDisplayType } from '@shared/enums/time-display-type.enum';
import { TimelineResolutionValues } from '@shared/consts/timeline-resolution-values.const';
import { TimeService } from '@shared/services/time.service';
import { MediconService } from '@shared/components/system/shared/services/medicon.service';
import { Subscription } from 'rxjs';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-medicon-tester',
  templateUrl: './medicon-tester.component.html',
  styleUrls: ['./medicon-tester.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MediconTesterComponent implements OnInit, OnDestroy {
  @Input() text: any;
  @Input() direction: Direction;
  @Input() defaultSettings: Settings;
  settings: Settings;
  LOCAL_STORAGE_KEY = 'medicationsSettings';
  isShowSettings = false;
  accordionClass = 'settings-accordion';
  prevSettings;
  serverData: MediconServerData;
  resolutionSubscription: Subscription;

  constructor(
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private timeService: TimeService,
    private mediconService: MediconService) {
    window['windowsSettings'] = {
      localDateFormatPadded: 'DD/MM/YY',
      localDateFormatUnpadded: 'D/M/YY'
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.initSettings();
      // this.onClickSettings();
      this.buildServerData();
      this.resolutionSubscription = this.mediconService.resolution$.subscribe(resolution => this.onChangeResolution(resolution));
    }, 50);
  }

  ngOnDestroy() {
    if (this.resolutionSubscription) this.resolutionSubscription.unsubscribe();
  }

  initSettings() {
    const item = this.getFromLocalStorage();
    this.settings = item ? JSON.parse(item) : JSON.parse(JSON.stringify(this.defaultSettings));
  }

  onClickResetTime() {
    this.settings.pivotTime = new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(new Date());
    this.saveToLocalStorage();
  }

  onChangePivotTime(e: Event) {
    this.settings.pivotTime = (e.target as any).value;
    if (this.settings.pivotTime.length === 1) this.settings.pivotTime = '0' + this.settings.pivotTime;
    if (this.settings.pivotTime.length === 2) this.settings.pivotTime += ':00';
    if (this.settings.pivotTime.length === 4) this.settings.pivotTime = '0' + this.settings.pivotTime;
    this.saveToLocalStorage();
  }

  onClickSettings() {
    this.prevSettings = JSON.parse(JSON.stringify(this.settings));
    this.isShowSettings = true;
  }

  onChangeResolution(resolution) {
    if (this.settings.resolution === resolution) return;
    this.settings.resolution = resolution;
    this.saveToLocalStorage(false);
  }

  onClickSaveSettings() {
    this.saveToLocalStorage();
    this.isShowSettings = false;
  }

  onClickCancelSettings() {
    this.settings = this.prevSettings;
    this.isShowSettings = false;
  }

  saveToLocalStorage(isShowToaster = true) {
    const item = JSON.stringify(this.settings);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, item);
    if (isShowToaster) this.toastr.success('Settings were saved');
    if (isShowToaster) this.buildServerData();
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
      this.buildServerData();
      this.toastr.success('Settings were saved');
      this.cdr.detectChanges();
    }
  }

  onDeleteMedication(sectionIndex, medicationId) {
    const medications = this.settings.sections[sectionIndex].medications;
    this.settings.sections[sectionIndex].medications = medications.filter(medication => medication.id !== medicationId);
    this.cdr.detectChanges();
  }

  buildServerData() {
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

    const getSection = (section, i): MediconSection => {
      return {
        id: 1,
        type: section.type,
        name: this.text.graphSections[i].title,
        isDisplay: section.isDisplay,
        categories: getCategories(section.medications)
      }
    }

    const timelineRange = this.getTimelineRange();
    this.serverData = {
      title: {
        fromTimeGmt: timelineRange.fromTimeGmt,
        toTimeGmt: timelineRange.toTimeGmt,
      },
      resolution: this.settings.resolution,
      sections: this.settings.sections.map((section, i) => getSection(section, i)),
      timelineRange: this.getTimelineRange()
    }
  }

  getTimelineRange(): MediconServerTimelineRange {
    const { pivotEpoch, pivotMidnightEpoch } = this.getPivotEpoch(this.settings.pivotTime);
    const { fromTimeGmt, toTimeGmt } = this.getTimelineRangeInGmt(pivotMidnightEpoch);
    return {
      fromTimeGmt,
      toTimeGmt,
      days: 12,
      pivotTimeGmt: this.timeService.epochToGmt(pivotEpoch)
    }
  }

  getPivotEpoch(time: string) {
    let pivotHour;
    let pivotMinutes;
    if (typeof(time) === 'string') {
      pivotHour = Number(time.substring(0, 2));
      pivotMinutes = Number(time.substring(3, 5));
    }
    const now = Date.now();
    const localEpoch = this.timeService.getLocalEpoch(now);
    const pivotMidnightEpoch = this.timeService.getUtcEpoch(localEpoch - (localEpoch % this.timeService.ONE_DAY_IN_MS));
    const pivotEpoch = pivotMidnightEpoch + (pivotHour * this.timeService.ONE_HOUR_IN_MS) + pivotMinutes * 60000;
    return { pivotEpoch, pivotMidnightEpoch };
  }

  getTimelineRangeInGmt(pivotMidnightEpoch) {
    const localTime = dayjs(pivotMidnightEpoch);
    const fromTime = localTime.subtract(10, 'day');
    const fromTimeGmt = this.timeService.epochToGmt(fromTime.valueOf());
    const toTime = localTime.add(2, 'day');
    const toTimeGmt = this.timeService.epochToGmt(toTime.valueOf());
    return { fromTimeGmt, toTimeGmt };
  }


  /*
    // old - get from/to for paging
    getTimelineRange(): MediconTimelineRange {
      const item = TimelineResolutionValues[this.settings.resolution];
      const pivotEpoch = this.timeService.getMidnightEpoch(this.settings.pivotTime);
      const roundBy = 60000 * item.minutes;
      const roundedPivotEpoch = pivotEpoch - (pivotEpoch % roundBy);
      const roundedPivotLocalEpoch = this.timeService.getLocalEpoch(roundedPivotEpoch);
      const tlStartEpoch = roundedPivotLocalEpoch - (6 * roundBy);
      const elEndEpoch = roundedPivotLocalEpoch + (6 * roundBy);
      const values = [];
      let interval = 0;
      for (let time = tlStartEpoch; time <= elEndEpoch; time += roundBy) {
        if (item.type !== TimeDisplayType.DateTime || ++interval % 2 !== 0) {
          values.push(this.timeService.getFormattedTime(item.type, time));
        }
      }
      const { fromTimeGmt, toTimeGmt } = this.timeService.getTimelineFromGmtToGmt();
      return {
        pivotTime: {
          epoch: this.timeService.getLocalEpoch(pivotEpoch),
          iso: this.timeService.getLocalIso(pivotEpoch)
        },
        range: {
          fromTimeGmt,
          fromTimeEpoch: tlStartEpoch,
          toTimeGmt,
          toTimeEpoch: elEndEpoch
        },
        days: 12
      }
    }
  */
}
