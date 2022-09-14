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
        { value: '1m', label: '1 minute' },
        { value: '2m', label: '2 minutes' },
        { value: '5m', label: '5 minutes' },
        { value: '15m', label: '15 minutes' },
        { value: '30m', label: '30 minutes' },
        { value: '1h', label: '1 hour' },
        { value: '2h', label: '2 hours' },
        { value: '4h', label: '4 hours' },
        { value: '8h', label: '8 hours' },
        { value: '24h', label: '24 hours' }
      ]
    },
    graphSections: [
      { title: 'Medications' },
      { title: 'Operations' },
      { title: 'Metrics' },
      { title: 'Table Metrics' }
    ],
    medicationsConcentrated: {
      legend: 'Legend'
    }
  }
} as const;
