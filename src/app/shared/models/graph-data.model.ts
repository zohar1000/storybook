// import * as echarts from 'echarts';
// import { PieSeriesOption } from 'echarts/types/dist/echarts';

export type GraphSeriesDataLines = Array<{ name: string; data : number[]; }>;
export type GraphSeriesDataPie = Array<{ name: string; value : number; }>;

export interface GraphData {
  title: {
    text: string;
  },
  legend?: {
    data: string[];
  },
  xAxis?: {
    data: string[];
  },
  series?: {
    data: GraphSeriesDataLines | GraphSeriesDataPie;
  }
}
