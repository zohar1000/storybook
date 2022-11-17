import { MediconLegendIconType } from "@shared/enums/medicon-legend-icon-type.enum";

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
        { value: '1m', label: 'ד1' },
        { value: '2m', label: '2ד' },
        { value: '5m', label: '5ד' },
        { value: '15m', label: '15ד' },
        { value: '30m', label: '30ד' },
        { value: '1h', label: 'ש1' },
        { value: '2h', label: '2ש' },
        { value: '4h', label: '4ש' },
        { value: '8h', label: '8ש' },
        { value: '24h', label: '24ש' }
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
        [MediconLegendIconType.Order]: 'הוראה',
        [MediconLegendIconType.RateChangeOrder]: 'הוראה לשינוי קצב',
        [MediconLegendIconType.Execution]: 'ביצוע',
        [MediconLegendIconType.Report]: 'דיווח',
        [MediconLegendIconType.NotAdministered]: 'אי מתן',
        [MediconLegendIconType.NotExecuted]: 'לא בוצע',
        [MediconLegendIconType.RateChange]: 'שינוי קצב',
        [MediconLegendIconType.DosageDecrease]: 'הורדת מינון',
        [MediconLegendIconType.DosageIncrease]: 'העלאת מינון',
        [MediconLegendIconType.Hold]: 'השהיה',
        [MediconLegendIconType.CancelHold]: 'ביטול השהיה',
        [MediconLegendIconType.Stop]: 'עצירה',
        [MediconLegendIconType.ExecutionTime]: 'מועד ביצוע / החלפת שקית מתוכנן'
      }
    }
  }
} as const;
