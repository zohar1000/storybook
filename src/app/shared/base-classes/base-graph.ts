import { GraphMetadata } from '@models/graph-metadata.model';
import { GraphData } from '@models/graph-data.model';
import * as echarts from 'echarts';
import { LinesSeriesOption, TitleComponentOption } from 'echarts/types/dist/echarts';
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
type EChartsOption = echarts.EChartsOption;
// import { axis } from 'echarts/types/dist/echarts';
// import { XAXisOption } from 'echarts';

@Directive()
export abstract class BaseGraph implements OnInit, AfterViewInit {
  @ViewChild('graphContainer') elRefGraphContainer: ElementRef;
  @ViewChild('graph') elRefGraph: ElementRef;
  @Input() metadata: GraphMetadata;
  @Input() data: GraphData;
  readonly FONT_STYLE = 'Rubik';
  readonly SPLIT_LINE_COLOR = '#eff1f4';
  readonly BORDER_RADIUS = 10;
  options: echarts.EChartsOption;
  graph;
  height;

  protected constructor(private cdr: ChangeDetectorRef, private vcr: ViewContainerRef) {}

  ngOnInit() {
    this.setGraphHeight();
    this.options = this.getOptions();
  }

  ngAfterViewInit() {
    // const echart = echarts.init(this.elRefGraph.nativeElement);
    // echart.on('finished', () => {
    //   console.log('finished ===>');
    //   // this.setGraphHeight()
    // });
    // this.cdr.detectChanges();
    // this.isAfterViewInit = true;

    // setTimeout(() => this.setGraphHeight(), 0);

  }

  getOptions() {
    const options: any = {
      title: this.getTitle(),
      legend: this.getLegend(),
      series: this.getSeries(),
      xAxis: this.getXAxis(),
      yAxis: this.getYAxis(),
      tooltip: this.getTooltip(),
      // grid: this.getGrid(),
      // height: this.setGraphHeight(),
      // responsive: true,
      // maintainAspectRatio: false
      // radius: [300, 300]
    };
    return options;
  }

  abstract getLegend(): echarts.LegendComponentOption;
  abstract getSeries(): echarts.LinesSeriesOption['data'] | echarts.PieSeriesOption;
  abstract getXAxis(): echarts.XAXisComponentOption;
  abstract getYAxis(): echarts.YAXisComponentOption;
  abstract getTooltip(): echarts.TooltipComponentOption;

  getTitle(): TitleComponentOption {
    return this.data.title;
  }

  getGrid(): echarts.GridComponentOption {
    return { top: '0', bottom: '0', left: '0', right: '0', containLabel: false }
  }

  setGraphHeight() {
    let height;
    if (typeof this.metadata.height === 'number') {
      if (this.metadata.height > 0) height = this.metadata.height + 'px';
    } else if (typeof this.metadata.height === 'string') {
      if (this.metadata.height !== '100%') {
        height = this.metadata.height + (this.metadata.height.endsWith('px') ? '' : 'px');
      }
    }

//     const printEl = (el, msg) => {
//       console.log(msg);
//       console.log('====================================');
//       // const el = this.elRefGraphContainer.nativeElement;
//       console.log(el);
//       const clientHeight = el.clientHeight;
//       const offsetHeight = el.offsetHeight;
//       const rect = el.getBoundingClientRect();
//       const computed = document.defaultView.getComputedStyle(el).height;
//       const currentStyle = el.currentStyle;
// console.log('clientHeight:', clientHeight);
// console.log('offsetHeight:', offsetHeight);
// console.log('rect:', rect);
// console.log('computed:', computed);
// console.log('currentStyle:', currentStyle);
//     }

    // const el = this.elRefGraphContainer.nativeElement;
    // printEl(el, 'Element')
    // const parent1 = el.parentElement;
    // printEl(parent1, 'parent1')
    // const parent2 = parent1.parentElement;
    // printEl(parent2, 'parent2')
// debugger;

    // console.log('vr:', this.vcr);
    // console.log('element:', this.vcr.element);
    // console.log('el:', this.vcr.element.nativeElement);
    // console.log('height:', height, this.metadata.height);

    this.height = height;
    return height;
  }
  //
  // getItemStyle(color) {
  //   return { color, borderRadius: this.BORDER_RADIUS };
  // }
}
