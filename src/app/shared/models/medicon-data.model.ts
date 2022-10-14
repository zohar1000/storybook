import { Medication } from '@stories/models/medication.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { MedicationsSectionType } from '@shared/enums/medications-section-type.enum';

export interface MediconData {
  title: {
    fromTime: string;
    toTime: string;
  },
  resolution: TimelineResolution;
  sections: MedicationsSection[],
  timeline: MedicationTimeline
}

export interface MedicationsSection {
  id: number;
  type: MedicationsSectionType;
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

export interface MedicationTimeline {
  range: {
    fromTime: string;
    toTime: string;
  }
  xAxisValues: string[];
  subDivision: number;
  interval: number;
  pivotTimePositionPct: number
}
