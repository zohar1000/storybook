import { MediconLegendIconType } from "@shared/enums/medicon-legend-icon-type.enum";

export const textEn = {
  direction: 'ltr',
  text: {
    buttons: {
      save: 'Save',
      cancel: 'cancel',
      defaultSettings: 'Reset to Default Settings'
    },
    pivotTime: {
      label: 'Pivot time',
      button: 'Reset Time'
    },
    resolution: {
      label: 'Resolution',
      options: [
        { value: '1m', label: '1m' },
        { value: '2m', label: '2m' },
        { value: '5m', label: '5m' },
        { value: '15m', label: '15m' },
        { value: '30m', label: '30m' },
        { value: '1h', label: '1h' },
        { value: '2h', label: '2h' },
        { value: '4h', label: '4h' },
        { value: '8h', label: '8h' },
        { value: '24h', label: '24h' }
      ]
    },
    graphSections: [
      { title: 'Medications' },
      { title: 'Operations' },
      { title: 'Metrics' },
      { title: 'Table Metrics' }
    ],
    medicon: {
      legend: 'Legend',
      icons: {
        [MediconLegendIconType.Order]: 'Order',
        [MediconLegendIconType.RateChangeOrder]: 'Rate change order',
        [MediconLegendIconType.Execution]: 'Execution',
        [MediconLegendIconType.Report]: 'Report',
        [MediconLegendIconType.NotAdministered]: 'Not Administered',
        [MediconLegendIconType.NotExecuted]: 'Not Executed',
        [MediconLegendIconType.RateChange]: 'Rate Change',
        [MediconLegendIconType.DosageDecrease]: 'Dosage Decrease',
        [MediconLegendIconType.DosageIncrease]: 'Dosage Increase',
        [MediconLegendIconType.Hold]: 'Hold',
        [MediconLegendIconType.CancelHold]: 'Cancel hold',
        [MediconLegendIconType.Stop]: 'Stop',
        [MediconLegendIconType.ExecutionTime]: 'planned Execution time'
      }
    }
  }
} as const;
