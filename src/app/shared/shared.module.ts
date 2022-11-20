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
import { MediconComponent } from '@shared/components/system/medicon/medicon.component';
import { MediconCategoryComponent } from '@shared/components/system/medicon-section-timeline/medicon-category/medicon-category.component';
import { MediconCategoryItemComponent } from '@shared/components/system/medicon-section-timeline/medicon-category-item/medicon-category-item.component';
import { MediconSectionContainerComponent } from '@shared/components/system/medicon-section-container/medicon-section-container.component';
import { MediconSectionTimelineComponent } from '@shared/components/system/medicon-section-timeline/medicon-section-timeline.component';
import { MediconTimelineValuesComponent } from '@shared/components/system/shared/medicon-timeline-values/medicon-timeline-values.component';
import { MediconExecutionPeriodicComponent } from './components/system/medicon-section-timeline/medicon-execution-periodic/medicon-execution-periodic.component';
import { MediconExecutionContinuousComponent } from './components/system/medicon-section-timeline/medicon-execution-continuous/medicon-execution-continuous.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { MediconIconComponent } from './components/system/shared/medicon-icon/medicon-icon.component';
import { MediconResolutionComponent } from './components/system/shared/medicon-resolution/medicon-resolution.component';
import { MediconScrollbarComponent } from './components/system/shared/medicon-scrollbar/medicon-scrollbar.component';
import { MediconTimelineGraphComponent } from './components/system/medicon-section-timeline/medicon-timeline-graph/medicon-timeline-graph.component';

const declarations = [
  GraphLinesComponent,
  GraphPieComponent,
  GraphTimelineComponent,
  GraphTimelineCategoryComponent,
  MediconComponent,
  MediconCategoryComponent,
  MediconCategoryItemComponent,
  MediconExecutionPeriodicComponent,
  MediconExecutionContinuousComponent,
  MediconIconComponent,
  MediconResolutionComponent,
  MediconScrollbarComponent,
  MediconSectionContainerComponent,
  MediconSectionTimelineComponent,
  MediconTimelineGraphComponent,
  MediconTimelineValuesComponent
];

const modules = [
  CommonModule,
  BrowserModule,
  FormsModule,
  BrowserAnimationsModule,
];

const importModules = [
  // bootstrap
  ModalModule,
  AccordionModule,
  ButtonsModule,
  PopoverModule.forRoot(),
  SortableModule,
  TooltipModule.forRoot(),
  // echarts
  NgxEchartsModule.forRoot({
    echarts: () => import('echarts')
  }),
  // toastr
  ToastrModule.forRoot({
    timeOut: 2000
  })
];

const exportModules = [
  // bootstrap
  ModalModule,
  AccordionModule,
  ButtonsModule,
  PopoverModule,
  SortableModule,
  TooltipModule,
  // echarts
  NgxEchartsModule,
  // toastr
  ToastrModule
];

@NgModule({
  declarations,
  imports: [
    ...modules,
    ...importModules
  ],
  exports: [
    ...declarations,
    ...modules,
    exportModules
  ]
})
export class SharedModule {}
