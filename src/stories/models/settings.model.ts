import { Medication } from '@stories/models/medication.model';

export interface Settings {
  languageCode: string;
  resolution: string;
  pivotTime: string;
  hoursForward: number;
  hoursBackward: number;
  refreshTime: number;
  sections: [{
    isDisplay: boolean;
    medications: Medication[]
  }];
}
