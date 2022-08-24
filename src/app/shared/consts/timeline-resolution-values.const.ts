import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { TimeDisplayType } from '@shared/enums/time-display-type.enum';

export const TimelineResolutionValues = {
  [TimelineResolution.Minutes1]: { minutes: 1, type: TimeDisplayType.Time, subDivision: 6, interval: 1 },
  [TimelineResolution.Minutes2]: { minutes: 2, type: TimeDisplayType.Time, subDivision: 2, interval: 1 },
  [TimelineResolution.Minutes5]: { minutes: 5, type: TimeDisplayType.Time, subDivision: 5, interval: 1 },
  [TimelineResolution.Minutes15]: { minutes: 15, type: TimeDisplayType.Time, subDivision: 3, interval: 1 },
  [TimelineResolution.Minutes30]: { minutes: 30, type: TimeDisplayType.Time, subDivision: 3, interval: 1 },
  [TimelineResolution.Hours1]: { minutes: 60, type: TimeDisplayType.Time, subDivision: 6, interval: 1 },
  [TimelineResolution.Hours2]: { minutes: 120, type: TimeDisplayType.Time, subDivision: 2, interval: 1 },
  [TimelineResolution.Hours4]: { minutes: 240, type: TimeDisplayType.DateTime, subDivision: 4, interval: 2 },
  [TimelineResolution.Hours8]: { minutes: 480, type: TimeDisplayType.DateTime, subDivision: 8, interval: 2 },
  [TimelineResolution.Hours24]: { minutes: 1440, type: TimeDisplayType.Date, subDivision: 4, interval: 1 }
}
