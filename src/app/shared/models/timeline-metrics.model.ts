export interface MediconTimelineMetrics {
  fromEpoch: number;
  toEpoch: number;
  gapEpoch: number;
  xAxisValues: string[];
  interval: number;
  timelineWidth: number;
  fullWidth: number;
  hardVerticalsWidth: number;
  hardVerticalsWidthStyle: string;
  softVerticalsWidthStyle: string;
  fillerWidth: number;
}
