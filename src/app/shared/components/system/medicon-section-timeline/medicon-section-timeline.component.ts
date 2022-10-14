import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MedicationsSection, MedicationTimeline } from '@models/medicon-data.model';

@Component({
  selector: 'app-medicon-section-timeline',
  templateUrl: './medicon-section-timeline.component.html',
  styleUrls: ['./medicon-section-timeline.component.scss']
})
export class MediconSectionTimelineComponent implements AfterViewInit {
  @ViewChild('categories') elRefCategories: ElementRef;
  @Input() text;
  @Input() section: MedicationsSection;
  @Input() timeline: MedicationTimeline;
  @Input() preTimelineWidth = 0;
  @Input() timelineWidth = 0;
  @Output() backgroundColored = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.setCategoriesBackgroundColor();
  }

  onExpandCondense() {
    this.setCategoriesBackgroundColor();
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

}
