import { Medication } from '@stories/models/medication.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';

export interface MedicationsConcentratedData {
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
  name: string;
  isDisplay: boolean;
  categories: MedicationsCategory[];
}

export interface MedicationsCategory {
  id: number;
  name: string;
  medications: Medication[]
}

export interface MedicationTimeline {
  range: {
    fromTime: string;
    toTime: string;
  }
  xAxisValues: string[];
}
