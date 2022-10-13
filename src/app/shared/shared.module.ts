import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { GraphLinesComponent } from './components/graphs/graph-lines.component';
import { GraphPieComponent } from './components/graphs/graph-pie.component';
import { GraphTimelineCategoryComponent } from '@shared/components/graphs/graph-timeline-category.component';
import { GraphTimelineComponent } from '@shared/components/graphs/graph-timeline.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { ToastrModule } from 'ngx-toastr';
import { MedicationsConcentratedComponent } from '@shared/components/system/medications-concentrated/medications-concentrated.component';
import { MedicationsSectionContainerComponent } from './components/system/medications-section-container/medications-section-container.component';
import { MedicationsCategoryComponent } from './components/system/medications-category/medications-category.component';
import { MedicationGraphComponent } from './components/system/medication-graph/medication-graph.component';
import { MedicationsSectionTimelineComponent } from './components/system/medications-section-timeline/medications-section-timeline.component';

const declarations = [
  GraphLinesComponent,
  GraphPieComponent,
  GraphTimelineComponent,
  GraphTimelineCategoryComponent,
  MedicationsConcentratedComponent,
  MedicationsSectionContainerComponent,
  MedicationsSectionTimelineComponent,
  MedicationsCategoryComponent,
  MedicationGraphComponent
];

const modules = [
  CommonModule,
  BrowserModule,
  FormsModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations,
  imports: [
    ...modules,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),

    // toastr
    ToastrModule.forRoot({
      timeOut: 2000
    })
  ],
  exports: [
    ...declarations,
    ...modules,
    NgxEchartsModule,

    // bootstrap
    ModalModule,
    AccordionModule,
    ButtonsModule,
    SortableModule,

    // toastr
    ToastrModule
  ]
})
export class SharedModule {}
