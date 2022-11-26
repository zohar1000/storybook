import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MediconService } from '@shared/components/system/shared/services/medicon.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medicon-resolution',
  templateUrl: './medicon-resolution.component.html',
  styleUrls: ['./medicon-resolution.component.scss']
})
export class MediconResolutionComponent implements OnInit, OnDestroy {
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
  subscription: Subscription;

  constructor(private mediconService: MediconService) {}

  ngOnInit(): void {
    this.options = this.text.resolution.options;
    const len = this.options.length;
    this.sliderWidth = len;
    this.sliderMax = len - 1;
    this.startLabel = this.options[0].label;
    this.endLabel = this.options[len - 1].label;
    this.subscription = this.mediconService.resolution$.subscribe(resolution => {
      this.ix = this.options.findIndex(item => item.value === resolution);
      this.label = this.options[this.ix].label;
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onChangeSlider(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.mediconService.setResolution(this.options[Number(e.target.value)].value);
  }

  onClickPivot() {
    this.isPivotEnabled = !this.isPivotEnabled;
  }
}
