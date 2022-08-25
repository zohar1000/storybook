import { ExecutionType } from '@stories/enums/execution-type.enum';

export interface Medication {
  id: number;
  type: ExecutionType;
  categoryId: number;
}
