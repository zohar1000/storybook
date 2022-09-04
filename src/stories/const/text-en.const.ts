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
        { value: '1hour', label: '1 hour' },
        { value: '2hour', label: '2 hours' },
        { value: '4hour', label: '4 hours' }
      ]
    },
    graphSections: [
      { title: 'Section 1' },
      { title: 'Section 2' },
      { title: 'Section 3' },
      { title: 'Section 4' }
    ],
    medicationsConcentrated: {
      title: 'Medications',
      legend: 'Legend'
    }
  }
} as const;
