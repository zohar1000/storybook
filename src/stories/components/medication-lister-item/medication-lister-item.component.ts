import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Medication } from '@stories/models/medication.model';
import { MedicationCategories } from '@stories/const/medication-categories.const';
import { medications } from '@stories/const/medications.const';
import { ExecutionType } from '@stories/enums/execution-type.enum';

@Component({
  selector: 'app-medication-lister-item',
  templateUrl: './medication-lister-item.component.html',
  styleUrls: ['./medication-lister-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedicationListerItemComponent implements OnInit {
  @Input() medication: Medication;
  @Input() index: number;
  @Output() delete = new EventEmitter<number>()
  MedicationCategories = MedicationCategories;
  medications = medications;
  ExecutionType = ExecutionType;
  categoryMedications = [];

  constructor() {}

  ngOnInit(): void {
    this.setCategoryMedication();
  }

  onChangeCategory(e) {
    const categoryId = Number(e.target.value);
    if (categoryId !== this.medication.categoryId) {
      console.log('onChangeCategory:', this.medication.categoryId, '==>', categoryId);
      this.medication.categoryId = Number(e.target.value);
      this.medication.id = 0;
      this.setCategoryMedication();
    }
    e.stopPropagation();
  }

  onChangeMedication(e) {
    this.medication.id = Number(e.target.value);
    console.log('onChangeMedication:', e.target.value);
    e.stopPropagation();
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  setCategoryMedication() {
    console.log('this.categoryMedications START:', this.medication.categoryId);
    this.categoryMedications = this.medications.filter(medication => medication.categoryId === this.medication.categoryId);
    console.log('this.categoryMedications:', this.categoryMedications);
  }

  onChangeTime(e, i) {
    this.stopPropagation(e);
    setTimeout(() => {
      this.medication.times[i] = e.target.value;
    });
  }


  onClickDelete() {
    let isConfirm = false;
    const item = this.medications.find(medication => medication.id === this.medication.id);
    if (item) isConfirm = confirm(`are you sure you want to delete "${item.name}"?`);
    if (!item || isConfirm) {
      this.delete.emit(this.medication.id);
    }
  }
}