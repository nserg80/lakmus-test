import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosesFormComponent } from './diagnoses-form.component';
import { DiagnosisItemComponent } from './diagnosis-item/diagnosis-item.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DiagnosesFormComponent,
    DiagnosisItemComponent
  ],
  exports: [
    DiagnosesFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DiagnosesFormModule { }
