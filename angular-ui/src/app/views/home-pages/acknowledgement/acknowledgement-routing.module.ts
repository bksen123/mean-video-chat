import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcknowledgementComponent } from './acknowledgement.component';

const routes: Routes = [
  {
    path: '', component: AcknowledgementComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcknowledgementRoutingModule { }
