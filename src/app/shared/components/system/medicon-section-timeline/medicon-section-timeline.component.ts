import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MediconSection, MediconTimelineRange, MediconTimelineValues } from '@models/medicon-server-data.model';
import { MediconLegendIcons } from '@shared/consts/medicon-legend-icons.const';

@Component({
  selector: 'app-medicon-section-timeline',
  templateUrl: './medicon-section-timeline.component.html',
  styleUrls: ['./medicon-section-timeline.component.scss']
})
export class MediconSectionTimelineComponent implements AfterViewInit {
  @ViewChild('categories') elRefCategories: ElementRef;
  @ViewChild('timelineGraph') elRefTimelineGraph: ElementRef;
  @Input() direction;
  @Input() text;
  @Input() section: MediconSection;
  @Input() timelineRange: MediconTimelineRange;
  @Input() timelineValues: MediconTimelineValues;
  @Output() changeResolution = new EventEmitter();
  MediconLegendIcons = MediconLegendIcons;
  legendColumns;
  timelineGraphWidth;

  constructor(private cdr: ChangeDetectorRef) {
    this.legendColumns = [
      this.MediconLegendIcons.filter(item => item.column === 0),
      this.MediconLegendIcons.filter(item => item.column === 1)
    ]
  }

  ngAfterViewInit() {
    const offsetWidth = this.elRefTimelineGraph.nativeElement.offsetWidth;
    this.timelineGraphWidth = offsetWidth - (offsetWidth % 12);
    this.cdr.detectChanges();

    // this.setCategoriesBackgroundColor();
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

  onChangeResolution(resolution) {
    this.changeResolution.emit(resolution);
  }

}
