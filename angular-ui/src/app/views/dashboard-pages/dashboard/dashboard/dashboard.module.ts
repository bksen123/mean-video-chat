import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedUiModule } from '../../../../shared-ui';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedUiModule,
    NgMultiSelectDropDownModule.forRoot(),
    DashboardRoutingModule,
    BsDatepickerModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }
