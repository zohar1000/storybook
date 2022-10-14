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
import { MediconCategoryComponent } from '@shared/components/system/medicon-category/medicon-category.component';
import { MediconCategoryItemComponent } from '@shared/components/system/medicon-category-item/medicon-category-item.component';
import { MediconSectionContainerComponent } from '@shared/components/system/medicon-section-container/medicon-section-container.component';
import { MediconSectionTimelineComponent } from '@shared/components/system/medicon-section-timeline/medicon-section-timeline.component';
import { MediconTimelineValuesComponent } from '@shared/components/system/medicon-timeline-values/medicon-timeline-values.component';

const declarations = [
  GraphLinesComponent,
  GraphPieComponent,
  GraphTimelineComponent,
  GraphTimelineCategoryComponent,
  MediconComponent,
  MediconCategoryComponent,
  MediconCategoryItemComponent,
  MediconSectionContainerComponent,
  MediconSectionTimelineComponent,
  MediconTimelineValuesComponent
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
