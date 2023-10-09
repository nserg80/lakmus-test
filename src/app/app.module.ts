import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DiagnosesFormModule } from './modules/diagnoses-form/diagnoses-form.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DiagnosesFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
