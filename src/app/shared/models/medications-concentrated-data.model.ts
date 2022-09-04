import { Medication } from '@stories/models/medication.model';

export interface MedicationsConcentratedData {
  title: {
    fromTime: string;
    toTime: string;
  },
  sections: MedicationsSection[]
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
