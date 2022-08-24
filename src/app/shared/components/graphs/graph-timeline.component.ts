import { ChangeDetectorRef, Component, ViewContainerRef } from '@angular/core';
import { BaseGraph } from '../../base-classes/base-graph';
import * as echarts from 'echarts';

@Component({
  selector: 'app-graph-timeline',
  template: `<div *ngIf="options" #graph echarts class="graph-container" [options]="options" [ngStyle]="{height}" (chartClick)="onGraphEvent($event)"></div>`
})
export class GraphTimelineComponent extends BaseGraph {
  constructor(cdr: ChangeDetectorRef, vcr: ViewContainerRef) {
    super(cdr, vcr);
  }

  getTooltip(): echarts.TooltipComponentOption {
    return { trigger: 'axis' };
  }
  getLegend(): echarts.LegendComponentOption {
    return this.data.legend;
  }

  getSeries(): echarts.LinesSeriesOption['data'] {
    return this.data.series.data.map(item => ({ ...item, type: 'line', stack: 'Total' }));
  }

  override getXAxis(): echarts.XAXisComponentOption {
    return {
      type: 'category',
      boundaryGap: false,
      data: this.data.xAxis.data
    };
  }

  override getYAxis(): echarts.YAXisComponentOption {
    return {
      type: 'value'
    };
  }

  onGraphEvent(e) {
    console.log(e);
    const str = `line: ${e.seriesName}, column: ${e.name}, value: ${e.value}`;
    alert(str);
  }
}
