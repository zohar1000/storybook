import { MediconLegendIconType } from "@shared/enums/medicon-legend-icon-type.enum";

export const MediconLegendIcons = [
  { type: MediconLegendIconType.Order, size: 0.9, stroke: 'black', column: 0 },
  { type: MediconLegendIconType.Execution, size: 0.95, stroke: 'black', column: 0 },
  { type: MediconLegendIconType.RateChangeOrder, size: 0.9, stroke: '#2eaafe', column: 0 },
  { type: MediconLegendIconType.Report, size: 0.95, stroke: 'black', column: 0 },
  { type: MediconLegendIconType.NotAdministered, size: 0.95, stroke: '#e24664', column: 0 },
  { type: MediconLegendIconType.NotExecuted, size: 0.95, stroke: '#e24664', column: 0 },

  { type: MediconLegendIconType.RateChange, size: 1, stroke: 'black', column: 1 },
  { type: MediconLegendIconType.DosageDecrease, size: 0.7, stroke: '#2eaafe', column: 1 },
  { type: MediconLegendIconType.DosageIncrease, size: 1, stroke: '#2eaafe', column: 1 },
  { type: MediconLegendIconType.Hold, size: 1, stroke: 'black', fill: '#ffd700', column: 1 },
  { type: MediconLegendIconType.CancelHold, size: 1, stroke: 'black', fill: '#7cfc00', column: 1 },
  { type: MediconLegendIconType.Stop, size: 1.15, stroke: 'black', column: 1 },
  { type: MediconLegendIconType.ExecutionTime, size: 0.9, stroke: 'black', column: 1 }
]
