import { Injectable } from '@angular/core';
import { TimeDisplayType } from '@shared/enums/time-display-type.enum';
import * as dayjs from 'dayjs';

@Injectable({ providedIn: 'root' })
export class TimeService {
  readonly ONE_HOUR_IN_MS = 3600000; // 1000 * 60 * 60
  readonly ONE_DAY_IN_MS = 86400000; // 1000 * 60 * 60 * 24
  readonly TimeFormatOptions = {
    date: { year: '2-digit', month: '2-digit', day: 'numeric' } as const,
    time: { hour: '2-digit', minute: '2-digit' } as const,
    dateTime: { year: '2-digit', month: '2-digit', day: 'numeric', hour: '2-digit', minute: '2-digit' } as const
  }
  locale = 'he-il';

  getLocalEpoch(epoch: number) {
    return epoch - this.getZoneOffsetInMs();
  }

  getUtcEpoch(epoch: number) {
    return epoch + this.getZoneOffsetInMs();
  }

  epochToLocalIso(epoch: number) {
    return (new Date(this.getLocalEpoch(epoch))).toISOString();
  }

  epochToLocalGmt(epoch: number) {
    // return (new Date(this.getLocalEpoch(epoch))).toISOString();
    return dayjs(this.getLocalEpoch(epoch)).format('YYYY-MM-DDTHH:mm:ss[Z]Z');
  }

  epochToGmt(epoch: number) {
    // return (new Date(this.getLocalEpoch(epoch))).toISOString();
    return dayjs(epoch).format('YYYY-MM-DDTHH:mm:ssZ');
  }

  getFormattedTime(type: TimeDisplayType, epoch: number) {
    const date = new Date(epoch);
    switch(type) {
      case TimeDisplayType.Time:
        // return date.toLocaleTimeString(this.locale, this.TimeFormatOptions.time);
        return dayjs(epoch).format('HH:mm');
      case TimeDisplayType.Date:
        // return date.toLocaleDateString(this.locale, this.TimeFormatOptions.date);
        return dayjs(epoch).format('D/M/YY');
      case TimeDisplayType.DateTime:
        return dayjs(epoch).format('D/M/YY HH:mm');
        // const isoTime = date.toLocaleString(this.locale, this.TimeFormatOptions.dateTime);
        // return isoTime.substring(0, 8) + ' ' + isoTime.substring(10, 15);
    }
  }

  gmtToEpoch(gmt) {
    return dayjs(gmt).valueOf();
  }

  gmtToLocalEpoch(gmt) {
    return this.getLocalEpoch(dayjs(gmt).valueOf());
  }

  getZoneOffsetInMs() {
    return (new Date()).getTimezoneOffset() * 60000;
  }

  getCurrUtcEpoch() {
    return Date.now();
  }

}
