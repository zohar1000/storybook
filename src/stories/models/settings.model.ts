import { Medication } from '@stories/models/medication.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { MediconSectionType } from '@shared/enums/medicon-section-type.enum';

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
    type: MediconSectionType,
    medications: Medication[]
  }];
}
