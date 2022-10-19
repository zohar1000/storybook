import { ExecutionType } from '@stories/enums/execution-type.enum';
import { MediconSectionType } from '@shared/enums/medicon-section-type.enum';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { Settings } from '@stories/models/settings.model';

export const defaultSettings: Settings = {
  languageCode: 'en',
  resolution: TimelineResolution.Hours1,
  pivotTime: '10:00',
  hoursForward: 14,
  hoursBackward: 5,
  refreshTime: 2,
  locale: 'he-il',
  sections: [
    {
      isDisplay: true,
      type: MediconSectionType.Timeline,
      medications: [
        { id: 10, name: 'Medication 10', categoryId: 1, type: ExecutionType.Continuous, timingType: null, times: ['', '', ''], orderTime: 10, executionTime: 20, duration: 480 },
        { id: 11, name: 'Medication 11', categoryId: 1, type: ExecutionType.Periodic, timingType: null, times: ['08:00', '14:00', '20:00'], orderTime: 0, executionTime: 0, duration: 0 },
        { id: 12, name: 'Medication 15', categoryId: 1, type: ExecutionType.Continuous, timingType: null, times: ['', '', ''], orderTime: 5, executionTime: 10, duration: 100 },
        { id: 20, name: 'Medication 22', categoryId: 2, type: ExecutionType.Periodic, timingType: null, times: ['09:00', '10:00', '11:00'], orderTime: 0, executionTime: 0, duration: 0 },
        { id: 30, name: 'Medication 32', categoryId: 3, type: ExecutionType.Periodic, timingType: null, times: ['11:00', '11:10', '11:20'], orderTime: 0, executionTime: 0, duration: 0 },
        { id: 31, name: 'Medication 31', categoryId: 3, type: ExecutionType.Continuous, timingType: null, times: ['', '', ''], orderTime: 10, executionTime: 30, duration: 200 },
      ]
    }
  ]
}

