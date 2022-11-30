import { Medication } from '@stories/models/medication.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { MediconSectionType } from '@shared/enums/medicon-section-type.enum';

export interface MediconServerData {
  title: {
    fromTimeGmt: string;
    toTimeGmt: string;
  },
  resolution: TimelineResolution;
  sections: MediconSection[],
  timelineRange: MediconServerTimelineRange
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

export interface MediconServerTimelineRange {
  fromTimeGmt: string;  // gmt time of start day
  toTimeGmt: string;
  days: number;
  pivotTimeGmt: string;
}
