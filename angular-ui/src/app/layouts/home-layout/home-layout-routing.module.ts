import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout.component';
import { isFalseAuthGuard } from '../../shared-ui';

const routes: Routes = [
  {
    path: '', // JUST LOAD HERE HOME LAYOUT COMPONENT FOR HEADER AND FOOTER AND MIDDLE COMPONENT NO NEED TO LOAD ANY PATH URL BECAUSE WE ARE USING SIMPLE URL. IT WILL LOADS JUST DASHBOARD CHILD MODULES.
    component: HomeLayoutComponent,
    children: [
      {
        path: 'login',
        canActivate: [isFalseAuthGuard],
        loadChildren: () =>
          import('../../views/home-pages/login/login.module').then(
            (mod) => mod.LoginModule
          ),
      },
      { path: '**', redirectTo: 'error-404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeLayoutRoutingModule { }
