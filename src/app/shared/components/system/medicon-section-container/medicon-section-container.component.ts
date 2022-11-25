import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediconSection } from '@models/medicon-server-data.model';
import { MediconSectionType } from '@shared/enums/medicon-section-type.enum';

@Component({
  selector: 'app-medicon-section-container',
  templateUrl: './medicon-section-container.component.html',
  styleUrls: ['./medicon-section-container.component.scss']
})
export class MediconSectionContainerComponent {
  @Input() direction;
  @Input() text;
  @Input() section: MediconSection;
  @Output() changeResolution = new EventEmitter();
  MediconSectionType = MediconSectionType;
}
