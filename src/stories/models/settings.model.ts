import { Medication } from '@stories/models/medication.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';

export interface Settings {
  languageCode: string;
  resolution: TimelineResolution;
  pivotTime: string;
  hoursForward: number;
  hoursBackward: number;
  refreshTime: number;
  sections: [{
    isDisplay: boolean;
    medications: Medication[]
  }];
}
