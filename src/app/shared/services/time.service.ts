import { Injectable } from '@angular/core';
import { TimeDisplayType } from '@shared/enums/time-display-type.enum';

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

  getMidnightEpoch(time: string): number {
    let pivotHour;
    let pivotMinutes;
    if (typeof(time) === 'string') {
      pivotHour = Number(time.substring(0, 2));
      pivotMinutes = Number(time.substring(3, 5));
    }
    const now = Date.now();
    const dayStartTime = now - (now % this.ONE_DAY_IN_MS);
    return dayStartTime + (pivotHour * this.ONE_HOUR_IN_MS) + pivotMinutes * 60000;
  }

  getLocalEpoch(epoch: number) {
    return epoch + this.getZoneOffsetInMs();
  }

  getLocalIso(epoch: number) {
    return (new Date(this.getLocalEpoch(epoch))).toISOString();
  }

  getZoneOffsetInMs() {
    return (new Date()).getTimezoneOffset() * 60000;
  }

  getFormattedTime(type: TimeDisplayType, epoch: number) {
    const date = new Date(epoch);
    switch(type) {
      case TimeDisplayType.Time:
        return date.toLocaleTimeString(this.locale, this.TimeFormatOptions.time)
      case TimeDisplayType.Date:
        return date.toLocaleDateString(this.locale, this.TimeFormatOptions.date);
      case TimeDisplayType.DateTime:
        const isoTime = date.toLocaleString(this.locale, this.TimeFormatOptions.dateTime);
        return isoTime.substring(0, 8) + ' ' + isoTime.substring(10, 15);
    }
  }
}
