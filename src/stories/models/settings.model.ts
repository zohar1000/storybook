import { Medication } from '@stories/models/medication.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { MedicationsSectionType } from '@shared/enums/medications-section-type.enum';

export interface Settings {
  languageCode: string;
  resolution: TimelineResolution;
  pivotTime: string;
  hoursForward: number;
  hoursBackward: number;
  refreshTime: number;
  locale: string;
  sections: [{
    isDisplay: boolean;
    type: MedicationsSectionType,
    medications: Medication[]
  }];
}
