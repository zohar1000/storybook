import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MedicationsCategory } from '@models/medicon-server-data.model';
import { MediconService } from '@shared/components/system/shared/services/medicon.service';
import { merge, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MediconTimelineMetrics } from '@models/timeline-metrics.model';
import { Medication } from '@stories/models/medication.model';
import { ExecutionType } from '@stories/enums/execution-type.enum';

@Component({
  selector: 'app-medicon-timeline-graph',
  templateUrl: './medicon-timeline-graph.component.html',
  styleUrls: ['./medicon-timeline-graph.component.scss']
})
export class MediconTimelineGraphComponent implements OnInit ,AfterViewInit, OnDestroy {
  @ViewChild('content') elRefContent;
  @ViewChild('graphLine') elRefGraphLine;
  @ViewChild('name') elRefName;
  @Input() categories: MedicationsCategory[];
  // @Input() timelineGraphWidth: number;
  // @Input() timelineRange: MediconTimelineRange;
  // @Input() timelineValues: MediconTimelineValues;
  // @Input() set categoryStates(value) {
  //   this.onChangeCategoryStates(value);
  // };
  @Input() medications: Medication[];
  // readonly PARTS = 12;
  // ExecutionType = ExecutionType;
  // subDivisionLines;
  // pivotTimePositionX;
  // fullWidth;
  // hardVerticalWidth;
  // softVerticalsWidth;
  // graphLinesCount;
  // fillerWidth;
  ExecutionType = ExecutionType;
  timelineGraphWidth;
  subscription: Subscription;
  isScrolledByUser = true;

  constructor(public mediconService: MediconService) {}

  ngOnInit() {
    // this.mediconService.pivotTime$.subscribe(pivotTime => {
    //   console.log('pivotTime:', pivotTime, ', metrics:', this.mediconService.timelineMetrics);
    // });

    // this.mediconService.timelineMetrics$.subscribe((metrics: MediconTimelineMetrics) => {
    //   console.log('metrics:', metrics, ', this.elRefContent:', this.elRefContent);
    //   // if (this.elRefContent)
    // });


    // this.fullWidth = 16 / 12 * this.timelineGraphWidth;
    // const hardVerticalWidth = this.fullWidth / 16;
    // this.hardVerticalWidth = hardVerticalWidth + 'px 100%';
    // this.softVerticalsWidth = hardVerticalWidth / 6 + 'px 100%';
    // this.fillerWidth = this.fullWidth - this.timelineGraphWidth;
    // this.timelineGraphWidth = this.mediconService.timelineMetrics.window.width; // + 1;



    // this.calcFullWidth();

    // this.subDivisionLines = this.timelineValues.subDivision - 1;
    // const pivotTimePositionPct = (this.timelineRange.pivotTime.epoch - this.timelineRange.range.fromTimeEpoch) / (this.timelineRange.range.toTimeEpoch - this.timelineRange.range.fromTimeEpoch)
    // this.pivotTimePositionX = pivotTimePositionPct * this.timelineWidth;
  }

  ngAfterViewInit() {
console.log('content width:', this.elRefContent.nativeElement.offsetWidth);
console.log('medications:', this.medications);


    const observables = [this.mediconService.timelineMetrics$, this.mediconService.scroll$.pipe(filter(val => val))];
    // const observables = [this.mediconService.scroll$];
    // const observables = [this.mediconService.timelineMetrics$];
    // @ts-ignore
    this.subscription = merge(...observables).subscribe(val => {
    // this.subscription = this.mediconService.scroll$.subscribe(val => {
      // const middleX = (metrics.scrollX + metrics.scrollX + metrics.window.width) / 2;
      // const middlePct = middleX / metrics.total.width;
      // const scrollX = metrics.scrollX;
      // console.log('graph comp., middlePct:', middlePct, ', metrics:', scrollX, metrics.window.width, metrics.total.width);
      // this.elRefContent.nativeElement.scrollTo(scrollX, 0);
      console.log('val:', val);
      console.log('scroll order to:', this.mediconService.timelineMetrics.scrollX);
      setTimeout(() => {
        this.isScrolledByUser = false;
        this.elRefContent.nativeElement.scrollTo(this.mediconService.timelineMetrics.scrollX, 0);

        setTimeout(() => {
          console.log('actual scroll pos:', this.elRefContent.nativeElement.scrollLeft);
        }, 10)
      }, 0);
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onResolution(resolution) {

  }

/*  calcFullWidth() {
    // for 24h
    this.graphLinesCount = 0;
    this.categories.forEach(category => {
      this.graphLinesCount += Math.max(category.medications.length, 1);
    });
    // this.medicationsCount += 'px';
  }*/

//   onChangeCategoryStates(categoryStates) {
// console.log('categoryStates:', categoryStates);
//     this.graphLinesCount = 0;
//     categoryStates.forEach(catState => {
//       if (!catState.isExpanded) {
//         this.graphLinesCount++;
//       } else {
//         const item = this.categories.find(cat => cat.id === catState.id);
//         this.graphLinesCount += item.medications.length;
//       }
//     })
//   }

  onScroll(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    // console.log('e:', e.target.scrollLeft, '/', e.target.scrollWidth);
    this.mediconService.onScrollTimeline(e.target.scrollLeft, this.isScrolledByUser);
    this.isScrolledByUser = true;
  }
}
