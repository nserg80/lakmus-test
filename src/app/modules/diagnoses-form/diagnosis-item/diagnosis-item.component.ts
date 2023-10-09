import { Component, OnInit, OnDestroy, Input, Output, ElementRef, HostListener, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Diagnosis } from '../diagnoses.models';


@Component({
  selector: 'diagnosis-item',
  templateUrl: './diagnosis-item.component.html',
  styleUrls: ['./diagnosis-item.component.scss']
})
export class DiagnosisItemComponent implements OnInit, OnDestroy, OnChanges {
  @Input() diagnoses: any[] = []; // TODO: interface
  @Input() diagnosesItem: Diagnosis = { name: '' };
  @Output() selectedDiagnosisEvent: EventEmitter<any> = new EventEmitter();
  @Output() getListEvent: EventEmitter<any> = new EventEmitter();

  public diagnosesToShow: any[] = [];
  public isShowList: boolean = false;
  private filterValue: string = '';


  public constructor(
    private element: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.diagnosesToShow = this.diagnoses;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['diagnoses']) {
      this.diagnosesToShow = changes['diagnoses'].currentValue;
      this.filterDiagnoses(this.filterValue)
    }
  }

  ngOnDestroy(): void {
  }

  public toggleList(event: Event): void {
    this.isShowList = !this.isShowList;
    if(this.isShowList) {
      this.getListEvent.emit();
    }
  }

  public closeList(): void {
    this.isShowList = false;
  }

  @HostListener('document:click', ['$event'])
  public clickOutside(event: Event) {
    if (!this.element.nativeElement?.contains(event?.target)) {
      this.closeList();
    }
  }

  public selectDiagnosis(diagnosis: Diagnosis): void {
    this.selectedDiagnosisEvent.emit(diagnosis);
    this.closeList();
  }

  public onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.filterValue = inputElement.value;

    this.getListEvent.emit();
  }

  public filterDiagnoses(inputValue: string): void {
    this.diagnosesToShow = this.diagnosesToShow.filter(diagnosis =>
      diagnosis.name.toLowerCase().includes(inputValue.trim().toLowerCase())
    );
  }
}
