import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MediconService } from '@shared/components/system/shared/services/medicon.service';

@Component({
  selector: 'app-medicon-resolution',
  templateUrl: './medicon-resolution.component.html',
  styleUrls: ['./medicon-resolution.component.scss']
})
export class MediconResolutionComponent implements OnInit {
  @Input() text;
  @Output() changeResolution = new EventEmitter();
  options;
  label;
  sliderWidth;
  sliderMax;
  ix;
  value;
  isPivotEnabled = true;
  startLabel;
  endLabel;

  constructor(private mediconService: MediconService) {}

  ngOnInit(): void {
    this.options = this.text.resolution.options;
    const len = this.options.length;
    this.sliderWidth = len;
    this.sliderMax = len - 1;
    this.ix = this.options.findIndex(item => item.value === this.mediconService.timelineMetrics.resolution);
    this.label = this.text.resolution.options[this.ix].label;
    this.startLabel = this.text.resolution.options[0].label;
    this.endLabel = this.text.resolution.options[len - 1].label;
  }

  onChangeSlider(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.ix = Number(e.target.value);
    this.label = this.options[this.ix].label;
    this.mediconService.setResolution(this.options[this.ix].value);
  }

  onClickPivot() {
    this.isPivotEnabled = !this.isPivotEnabled;
  }
}
