import { Component, Input, OnInit } from '@angular/core';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';

@Component({
  selector: 'app-medicon-resolution',
  templateUrl: './medicon-resolution.component.html',
  styleUrls: ['./medicon-resolution.component.scss']
})
export class MediconResolutionComponent implements OnInit {
  @Input() text;
  @Input() resolution: TimelineResolution;
  values;
  sliderWidth;
  sliderMax;
  ix;
  value;
  isPivotEnabled = true;

  ngOnInit(): void {
    this.values = this.text.resolution.options.map(item => item.value);
    this.sliderWidth = this.values.length;
    this.sliderMax = this.sliderWidth - 1;
    this.ix = this.values.indexOf(this.resolution);
    this.value = this.values[this.ix];
  }

  onChangeSlider(e) {
    this.ix = Number(e.target.value);
    this.value = this.values[this.ix];
  }

  onClickPivot() {
    this.isPivotEnabled = !this.isPivotEnabled;
  }
}
