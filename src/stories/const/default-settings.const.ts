import { ExecutionType } from '@stories/enums/execution-type.enum';
import { MedicationsSectionType } from '@shared/enums/medications-section-type.enum';

export const defaultSettings = {
  languageCode: 'en',
  resolution: '1hour',
  pivotTime: '10:00',
  hoursForward: 14,
  hoursBackward: 5,
  refreshTime: 2,
  sections: [
    {
      isDisplay: true,
      type: MedicationsSectionType.Timeline,
      medications: [
        { id: 10, name: 'Medication 10', categoryId: 1, type: ExecutionType.Continuous, timingType: null, times: ['', '', ''], orderTime: 10, executionTime: 20, duration: 480 },
        { id: 11, name: 'Medication 11', categoryId: 1, type: ExecutionType.Periodic, timingType: null, times: ['08:00', '14:00', '20:00'], orderTime: 0, executionTime: 0, duration: 0 },
      ]
    }
  ]
}

