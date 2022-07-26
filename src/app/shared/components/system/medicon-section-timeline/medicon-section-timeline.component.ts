import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MediconSection, MediconTimeline } from '@models/medicon-data.model';
import { MediconLegendIcons } from '@shared/consts/medicon-legend-icons.const';

@Component({
  selector: 'app-medicon-section-timeline',
  templateUrl: './medicon-section-timeline.component.html',
  styleUrls: ['./medicon-section-timeline.component.scss']
})
export class MediconSectionTimelineComponent implements AfterViewInit {
  @ViewChild('categories') elRefCategories: ElementRef;
  @Input() direction;
  @Input() text;
  @Input() section: MediconSection;
  @Input() timeline: MediconTimeline;
  @Input() preTimelineWidth = 0;
  @Input() timelineWidth = 0;
  @Output() backgroundColored = new EventEmitter();
  MediconLegendIcons = MediconLegendIcons;
  legendColumns;

  constructor(private cdr: ChangeDetectorRef) {
    this.legendColumns = [
      this.MediconLegendIcons.filter(item => item.column === 0),
      this.MediconLegendIcons.filter(item => item.column === 1)
    ]
  }

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
