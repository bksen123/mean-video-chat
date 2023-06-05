import { NgModule } from '@angular/core';
import { SharedUiModule } from '../../shared-ui';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DashboardLayoutRoutingModule } from './dashboard-layout-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';

@NgModule({
  declarations: [DashboardLayoutComponent, DashboardSidebarComponent],
  imports: [
    SharedUiModule,
    DashboardLayoutRoutingModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
})
export class DashboardLayoutModule { }
