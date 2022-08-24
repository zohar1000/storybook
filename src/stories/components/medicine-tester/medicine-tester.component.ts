import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Direction } from '@stories/models/direction.model';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { GraphMetadata } from '@models/graph-metadata.model';
import { GraphData } from '@models/graph-data.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-medicine-tester',
  templateUrl: './medicine-tester.component.html',
  styleUrls: ['./medicine-tester.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MedicineTesterComponent {
  @Input() direction: Direction;
  @Input() text: any;
  @Input() resolution: TimelineResolution;
  @Input() metadata: GraphMetadata;
  @Input() data: GraphData;

  // config = {
  //   pivotTime: '10:00'
  // }
  modalRef: BsModalRef;
  isSettings = false;

  // config
  pivotTime = '10:00';
  hoursForward = 4;
  hoursBackward = 4;
  refreshTime = 1;

  constructor(private modalService: BsModalService) {}

  onClickResetTime(e) {
    this.pivotTime = new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(new Date());
  }

  onChangePivotTime(e: Event) {
    this.pivotTime = (e.target as any).value;
    if (this.pivotTime.length === 2) this.pivotTime += ':00';
  }

  onClickSettings(template: TemplateRef<any>) {
    console.log('onClickSettings');
    this.isSettings = true;
    return;
    this.modalRef = this.modalService.show(template, { class: 'settings-modal' });
    const subscription = this.modalService.onHide.subscribe((reason: string | any) => {
      console.log('close reason:', typeof reason, reason);
      // if (typeof reason !== 'string') {
      //   reason = `onHide(), modalId is : ${reason.id}`;
      // }
      // const _reason = reason ? `, dismissed by ${reason}` : '';
      // this.messages.push(`onHide event has been fired${_reason}`);
      // console.log('subbscription1:', subscription.closed);
      // setTimeout(() => console.log('subbscription2:', subscription.closed));
      setTimeout(() => {
        subscription.unsubscribe();
        this.isSettings = false;
      });
      // setTimeout(() => console.log('subbscription3:', subscription.closed), 1000);
      // setTimeout(() => subscription.unsubscribe(), 2000);
    })
  }

  onChangeResolution(e) {

  }

  onClickSaveSettings() {

  }

  onClickCancelSettings() {
    this.isSettings = false;
  }
}
