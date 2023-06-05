import { NgModule } from '@angular/core';
import { SharedUiModule } from '../../../../shared-ui';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedUiModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
