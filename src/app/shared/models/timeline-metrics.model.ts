export interface MediconTimelineMetrics {
  // total range - the entire scroll, including filler
  // data range - only the range that is coming from the server
  // window range - the visible portion
  total: {
    fromEpoch: number;
    toEpoch: number;
    width: number;
    fillerWidth: number;
    rangeMs: number;
  },
  data: {
    fromEpoch: number;
    toEpoch: number;
    columns: number;
  },
  window: {
    width: number;
    rangeMs: number;
  },
  // fromEpoch: number;
  // toEpoch: number;
  columnMs: number;
  // xAxisValues: string[];
  interval: number;
  // timelineWidth: number;
  // fullWidth: number;
  hardVerticalWidth: number;
  hardVerticalWidthStyle: string;
  softVerticalWidthStyle: string;
  xAxisValueWidth: number;
  scrollX: number;
  pivotEpoch: number;
  pivotX: number;
}
