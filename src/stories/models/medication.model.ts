import { ExecutionType } from '@stories/enums/execution-type.enum';

export interface BaseMedication {
  id: number;
  categoryId: number;
  type: ExecutionType;
  timingType?: any;
}

export interface MedicationContinuous extends BaseMedication {
  orderTime: number;
  executionTime: number;
  duration: number;
}

export interface MedicationPeriodic extends BaseMedication {
  times: string[];
}

export type Medication = MedicationContinuous | MedicationPeriodic;
