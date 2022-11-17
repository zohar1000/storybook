import { Medication } from '@stories/models/medication.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { MediconSectionType } from '@shared/enums/medicon-section-type.enum';

export interface MediconServerData {
  title: {
    fromTime: string;
    toTime: string;
  },
  resolution: TimelineResolution;
  sections: MediconSection[],
  timeline: MediconTimeline
}

export interface MediconSection {
  id: number;
  type: MediconSectionType;
  name: string;
  isDisplay: boolean;
  categories: MedicationsCategory[];
}

export interface MedicationsCategory {
  id: number;
  name: string;
  color: string;
  medications: Medication[]
}

export interface MediconTimeline {
  range: {
    fromTime: string;
    fromEpoch: number;
    toTime: string;
    toEpoch: number;
  }
  pivotTime: {
    epoch: number;  // local epoch time
    iso: string;    // local iso time
  }
  xAxisValues: string[];
  subDivision: number;
  interval: number;
  days: number;
}
