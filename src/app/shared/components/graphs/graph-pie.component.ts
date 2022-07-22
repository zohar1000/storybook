import { ChangeDetectorRef, Component, ViewContainerRef } from '@angular/core';
import { BaseGraph } from '../../base-classes/base-graph';
import * as echarts from 'echarts';
import { GraphSeriesDataPie } from '@models/graph-data.model';

@Component({
  selector: 'app-graph-pie',
  template: `<div *ngIf="options" #graph echarts class="graph-container" [options]="options" [ngStyle]="{height}"></div>`
})
export class GraphPieComponent extends BaseGraph {
  constructor(cdr: ChangeDetectorRef, vcr: ViewContainerRef) {
    super(cdr, vcr);
  }

  getTooltip(): echarts.TooltipComponentOption {
    return undefined;  // { trigger: 'axis' };
  }

  getLegend(): echarts.LegendComponentOption {
    return undefined;  // this.data.legend;
  }

  // getSeries(): echarts.PieSeriesOption {
  getSeries(): any {
    // const itemStyle = this.getItemStyle();
    return [{ type: 'pie', data: this.data.series.data as GraphSeriesDataPie }];  //     this.data.series.map(item => ({ ...item, type: 'pie' }));
  }

  override getXAxis(): echarts.XAXisComponentOption {
    return undefined;
  }

  override getYAxis(): echarts.YAXisComponentOption {
    return undefined;
  }

  getItemStyle() {
    return {
      label: {
        show: true,
        position: 'inner',
        formatter: function (params) {
          return  params.value + '%\n'
        },
        textStyle: {
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: true
      },
      emphasis: {
        label: {
          show: true,
            position: 'center',
        }
      }
    }
  }
  //
  // getItemStyle() {
  //   return {
  //     normal : {
  //       label : {
  //         show: true, position: 'inner',
  //           formatter : function (params){
  //           return  params.value + '%\n'
  //         },
  //       },
  //       labelLine : {
  //         show : true
  //       }
  //     },
  //     emphasis : {
  //       label : {
  //         show : true,
  //           position : 'center',
  //           textStyle : {
  //           fontSize : '30',
  //             fontWeight : 'bold'
  //         }
  //       }
  //     }
  //   }
  // }
}
