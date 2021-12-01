import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    AlertComponent
  ]
})
export class AlertModule { }
