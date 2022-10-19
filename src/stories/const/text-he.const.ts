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
        { value: '1m', label: 'דקה 1' },
        { value: '2m', label: '2 דקות' },
        { value: '5m', label: '5 דקות' },
        { value: '15m', label: '15 דקות' },
        { value: '30m', label: '30 דקות' },
        { value: '1h', label: 'שעה 1' },
        { value: '2h', label: '2 שעות' },
        { value: '4h', label: '4 שעות' },
        { value: '8h', label: '8 שעות' },
        { value: '24h', label: '24 שעות' }
      ]
    },
    graphSections: [
      { title: 'תרופות' },
      { title: 'פעולות' },
      { title: 'מדדים' },
      { title: 'מדדים בטבלה' }
    ],
    medicon: {
      legend: 'מקרא',
      icons: {
        command: 'הוראה',
        rateChangeCommand: 'הוראה לשינוי קצב',
        execution: 'ביצוע',
        report: 'דיווח',
        notAdministered: 'אי מתן',
        notExecuted: 'לא בוצע',
        rateChange: 'שינוי קצב',
        dosageDecrease: 'הורדת מינון',
        dosageIncrease: 'העלאת מינון',
        delay: 'השהיה',
        cancelDelay: 'ביטול השהיה',
        stop: 'עצירה',
        executionTime: 'מועד ביצוע / החלפת שקית מתוכנן'
      }
    }
  }
} as const;
