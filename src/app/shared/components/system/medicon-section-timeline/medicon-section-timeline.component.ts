import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MediconSection } from '@models/medicon-server-data.model';
import { MediconLegendIcons } from '@shared/consts/medicon-legend-icons.const';
import { MediconService } from '@shared/components/system/shared/services/medicon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medicon-section-timeline',
  templateUrl: './medicon-section-timeline.component.html',
  styleUrls: ['./medicon-section-timeline.component.scss']
})
export class MediconSectionTimelineComponent implements OnInit {
  @ViewChild('categories') elRefCategories: ElementRef;
  @ViewChild('timelineGraph') elRefTimelineGraph: ElementRef;
  @Input() direction;
  @Input() text;
  @Input() section: MediconSection;
  MediconLegendIcons = MediconLegendIcons;
  legendColumns;
  categoryStates;
  medications = [];
  subscription: Subscription;

  constructor(public mediconService: MediconService) {
    this.legendColumns = [
      this.MediconLegendIcons.filter(item => item.column === 0),
      this.MediconLegendIcons.filter(item => item.column === 1)
    ]
  }

  ngOnInit() {
    this.categoryStates = this.section.categories.map(cat => ({ id: cat.id, isExpanded: true }));
    this.setMedications();
    this.mediconService.timelineMetrics.total.width;
  }

  onExpandCondense(id, isExpanded) {
    const item = this.categoryStates.find(cat => cat.id === id);
    item.isExpanded = isExpanded;
    this.setMedications();
  }

  setMedications() {
    this.medications = [];
    this.categoryStates.forEach(catState => {
      if (!catState.isExpanded) {
        this.medications.push(null);
      } else {
        const category = this.section.categories.find(cat => cat.id === catState.id);
        category.medications.forEach(medication => this.medications.push(medication));
      }
    });
  }
}
