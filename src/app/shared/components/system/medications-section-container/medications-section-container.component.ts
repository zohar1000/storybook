import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MedicationsSection, MedicationTimeline } from '@models/medications-concentrated-data.model';
import { MedicationsSectionType } from '@shared/enums/medications-section-type.enum';

@Component({
  selector: 'app-medications-section-container',
  templateUrl: './medications-section-container.component.html',
  styleUrls: ['./medications-section-container.component.scss']
})
export class MedicationsSectionContainerComponent implements OnInit {
  @ViewChild('categories') elRefCategories: ElementRef;
  @Input() section: MedicationsSection;
  @Input() timeline: MedicationTimeline;
  @Input() preTimelineWidth = 0;
  @Input() timelineWidth = 0;
  MedicationsSectionType = MedicationsSectionType;
  timelineValuesWidth;
  timelineValuesRight;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const valueWidth = this.timelineWidth / 12;
    this.timelineValuesWidth = valueWidth * this.timeline.xAxisValues.length;
    this.timelineValuesRight = -valueWidth / 2;
  }

  setCategoriesBackgroundColor() {
    const graphElements = this.elRefCategories.nativeElement.getElementsByClassName('graph');
    const pairClasses = ['section-graph-odd', 'section-graph-even'];
    let pairIx = 0;
    let elementIx = 0;
    for (let element of graphElements) {
      element.classList.remove('section-graph-odd');
      element.classList.remove('section-graph-even');
      element.classList.add(pairClasses[pairIx]);
      pairIx = 1 - pairIx;
      ++elementIx === graphElements.length ? element.classList.add('last-section-graph') : element.classList.remove('last-section-graph');
    }
    this.cdr.detectChanges();
  }

  // onExpandCondense() {
  //   this.setCategoriesBackgroundColor();
  // }

  // onTimelineWidth(width, categoryIx) {
  //   if (categoryIx === 0) {
  //     console.log('section width:', width, categoryIx);
  //     this.timelineWidth = width;
  //   }
  // }
}
