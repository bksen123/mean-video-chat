import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { AuthGuard } from '../../shared-ui';
import { ProfileSettingComponent } from 'src/app/views/dashboard-pages/profile-setting/profile-setting.component';

const routes: Routes = [
  {
    path: '', // JUST LOAD HERE DASHBOARD LAYOUT COMPONENT FOR HEADER AND FOOTER AND MIDDLE COMPONENT NO NEED TO LOAD ANY PATH URL BECAUSE WE ARE USING SIMPLE URL. IT WILL LOADS JUST DASHBOARD CHILD  MODULES.
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import(
            '../../views/dashboard-pages/dashboard/dashboard/dashboard.module'
          ).then((mod) => mod.DashboardModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../../views/dashboard-pages/users/users.module').then(
            (mod) => mod.UsersModule
          ),
      },
      {
        path: 'setting',
        component: ProfileSettingComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardLayoutRoutingModule { }
