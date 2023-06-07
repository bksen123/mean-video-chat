import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcknowledgementRoutingModule } from './acknowledgement-routing.module';
import { AcknowledgementComponent } from './acknowledgement.component';
import { SharedUiModule } from 'src/app/shared-ui';


@NgModule({
  declarations: [
    AcknowledgementComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    AcknowledgementRoutingModule
  ]
})
export class AcknowledgementModule { }
