import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MedicationsSection, MedicationTimeline } from '@models/medications-concentrated-data.model';

@Component({
  selector: 'app-medications-section',
  templateUrl: './medications-section.component.html',
  styleUrls: ['./medications-section.component.scss']
})
export class MedicationsSectionComponent implements AfterViewInit {
  @ViewChild('categories') elRefCategories: ElementRef;
  // @ViewChild('xAxisTimelineHeader') elRefXAxisTimelineHeader: ElementRef;
  // @ViewChild('xAxisTimelineFooter') elRefXAxisTimelineFooter: ElementRef;
  @ViewChildren('xAxisTimeline') elRefXAxisTimelines;
  @Input() section: MedicationsSection;
  @Input() timeline: MedicationTimeline;
  timelineWidth;

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.setCategoriesBackgroundColor();
    this.setTimelineWidth();
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

  setTimelineWidth() {
    if (!this.timelineWidth) return;
    const widthPart = this.timelineWidth / 12;
    const width = widthPart * 13;
    for (let elRef of this.elRefXAxisTimelines) {
      this.renderer.setStyle(elRef.nativeElement, 'width', `${width}px`);
      this.renderer.setStyle(elRef.nativeElement, 'right', `-${widthPart / 2}px`);
    }
  }

  onExpandCondense() {
    this.setCategoriesBackgroundColor();
  }

  onTimelineWidth(width, categoryIx) {
    if (categoryIx === 0) {
      console.log('section width:', width, categoryIx);
      this.timelineWidth = width;
    }
  }
}
