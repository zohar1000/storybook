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
  timelineRange: MediconTimelineRange
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

export interface MediconTimelineRange {
  range: {
    fromTimeGmt: string;  // gmt time of start day
    fromTimeEpoch: number;
    toTimeGmt: string;
    toTimeEpoch: number;
  }
  days: number;
  pivotTime: {
    epoch: number;  // local epoch time
    iso: string;    // local iso time
  }
}

export interface MediconTimelineValues {
  resolution: TimelineResolution;
  xAxisValues: string[];
  subDivision: number;
  interval: number;
}

export interface MediconTimeMetrics {
  fullWidth: number;
  hardVerticalsWidth: number;
  softVerticalsWidth: number;
  fillerWidth: number;
  timelineGraphWidth: number;
}
