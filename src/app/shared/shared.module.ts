import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { GraphLinesComponent } from './components/graphs/graph-lines.component';
import { GraphPieComponent } from './components/graphs/graph-pie.component';
import { GraphTimelineCategoryComponent } from '@shared/components/graphs/graph-timeline-category.component';
import { GraphTimelineComponent } from '@shared/components/graphs/graph-timeline.component';
import { MedicineComponent } from './components/system/medicine/medicine.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';

const declarations = [
  GraphLinesComponent,
  GraphPieComponent,
  GraphTimelineComponent,
  GraphTimelineCategoryComponent,
  MedicineComponent
];

const modules = [
  CommonModule,
  BrowserModule,
  FormsModule,
];

@NgModule({
  declarations,
  imports: [
    ...modules,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [
    ...declarations,
    ...modules,
    NgxEchartsModule,
    ModalModule
  ]
})
export class SharedModule {}
