import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { GraphLinesComponent } from './components/graphs/graph-lines.component';
import { GraphPieComponent } from './components/graphs/graph-pie.component';

const declarations = [
  GraphLinesComponent,
  GraphPieComponent
];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [
    ...declarations,
    NgxEchartsModule,
  ]
})
export class SharedModule {}
