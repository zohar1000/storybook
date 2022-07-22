export abstract class BaseHorizontalBar {
  readonly FONT_STYLE = 'Rubik';
  readonly SPLIT_LINE_COLOR = '#eff1f4';
  readonly BORDER_RADIUS = 10;
  options;

  setOptions(labels, values, colors) {
    this.options = this.getOptions(labels, values, colors);
  }

  getOptions(labels, values, colors) {
    const options: any = {
      // title: this.getTitle(title),
      series: this.getSeries(labels, values, colors),
      xAxis: this.getXAxis(),
      yAxis: this.getYAxis(labels),
      tooltip: this.getTooltip(),
      grid: {
        top: '50',
        bottom: '30',
        left: '70',
        right: '25'
      }
    };
    return options;
  }

  getSeries(labels, values, colors) {
    return [{
      type: 'bar',
      data: values.map((value, i) => ({ value, itemStyle: this.getItemStyle(colors[i]) })),
      label: {
        show: false
      },
      labelLine: {
        show: true
      },
      barWidth: 13,
      showBackground: true,
      backgroundStyle: {
        color: '#f6f6f7',
        borderRadius: this.BORDER_RADIUS
      }
    }];
  }

  getXAxis() {
    return {
      max: 'dataMax',
      splitLine: {
        show: false
      }
    };
  }

  getYAxis(labels) {
    return {
      position: 'left',
      inverse: true,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {  // lines between bars
        show: true,
        lineStyle: {
          color: this.SPLIT_LINE_COLOR
        }
      },
      axisLabel: {
        margin: 16
      },
      type: 'category',
      data: labels,
    };
  }

  getTooltip() {
    return {
      trigger: 'item',
      // formatter: params => `${params.name} ${params.value}`
      formatter: params => `${params.value}`
    };
  }

  getTitle(title) {
    return title ?  { text: title } : undefined;
  }

  getItemStyle(color) {
    return { color, borderRadius: this.BORDER_RADIUS };
  }
}
