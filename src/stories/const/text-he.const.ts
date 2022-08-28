export const textHe = {
  direction: 'rtl',
  text: {
    buttons: {
      save: 'שמירה',
      cancel: 'ביטול',
      defaultSettings: 'איפוס הגדרות'
    },
    pivotTime: {
      label: 'שעת ציר',
      button: 'זמן נוכחי'
    },
    resolution: {
      label: 'רזולוציה',
      options: [
        { value: '1hour', label: 'שעה' },
        { value: '2hour', label: '2 שעות' },
        { value: '4hour', label: '4 שעות' }
      ]
    },
    graphSections: [
      { title: 'חלק 1' },
      { title: 'חלק 2' },
      { title: 'חלק 3' },
      { title: 'חלק 4' }
    ]
  }
} as const;
