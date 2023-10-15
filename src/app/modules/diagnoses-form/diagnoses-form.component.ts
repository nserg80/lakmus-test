import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api-service.service';
import { Diagnosis } from './diagnoses.models';

@Component({
  selector: 'diagnoses-form',
  templateUrl: './diagnoses-form.component.html',
  styleUrls: ['./diagnoses-form.component.scss']
})
export class DiagnosesFormComponent implements OnInit, OnDestroy {
  public diagnoses: any[] = []; // TODO: interface
  public selectedDiagnoses: any[] = []; // TODO: interface
  public date: string = '';
  public formattedJson: string = '';
  private subscriptions: Subscription[] = [];
  public dateError: string = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getDiagnoses();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private getDiagnoses() {
    this.apiService.getDiagnoses()
      .pipe(
        tap((data: any[]) => {
          this.diagnoses = data;
        }),
      )
      .subscribe();
  }

  public handleSelectedDiagnosis(diagnosis: Diagnosis, elementIndex: number): void {
    this.selectedDiagnoses.splice(elementIndex, 1, diagnosis)
  }

  public handleGetList(elementIndex: number): void {
    if (!this.selectedDiagnoses[elementIndex].name) {
      this.selectedDiagnoses[elementIndex].id = undefined;
    }
    this.getDiagnoses();

    this.diagnoses = this.diagnoses.filter(diagnosis => !this.selectedDiagnoses.some(selectedDiagnosis => selectedDiagnosis.id === diagnosis.id));
  }

  public addItem(): void {
    this.selectedDiagnoses.push({ name: '' })
  }

  public checkDateValid(): void {
    this.dateError = '';
    if (!this.date) {
      this.dateError = 'Будь ласка, введіть дату'
      return
    }

    const selectedDate = new Date(this.date);
    const currentDate = new Date();

    // ignore time
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      this.dateError = 'Дата не може бути в минулому'
    }
  }

  public generateJson(): void {
    this.checkDateValid();
    if (this.dateError) {
      return
    }
    const conditions = this.selectedDiagnoses.map((diagnosisItem) => {
      if (diagnosisItem.id && diagnosisItem.name) {
        return {
          id: this.generateGuid(),
          context: {
            identifier: {
              type: {
                coding: [
                  {
                    system: 'eHealth/resources',
                    code: 'encounter'
                  }
                ]
              },
              value: diagnosisItem.id
            }
          },
          code: {
            coding: [
              {
                system: 'eHealth/ICPC2/condition_codes',
                code: diagnosisItem.code
              }
            ]
          },
          notes: diagnosisItem.comment || ''
        };
      }
      return null
    }).filter(item => item !== null)

    const jsonData = {
      encounter: {
        date: new Date(this.date).toISOString()
      },
      conditions: conditions.length ? conditions : null
    };
    this.formattedJson = JSON.stringify(jsonData, null, 2);
  }

  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
