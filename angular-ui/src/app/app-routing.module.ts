import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './views/pagenotfound/pagenotfound.component';

// IT'S LAZY LOADING FEATURE.
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', // JUST LOAD HERE HOME LAYOUT MODULE NO NEED TO LOAD ANY PATH URL IN HERE BECAUSE. IT WILL LOAD JUST HOME LAYOUT ROUTING
    loadChildren: () =>
      import('./layouts/home-layout/home-layout.module').then(
        (mod) => mod.HomeLayoutModule
      ),
  },
  {
    path: '', // JUST LOAD HERE DASHBOARD LAYOUT MODULE NO NEED TO LOAD ANY PATH URL IN HERE BECAUSE. IT WILL LOAD JUST DASHBOARD LAYOUT ROUTING
    loadChildren: () =>
      import('./layouts/dashboard-layout/dashboard-layout.module').then(
        (mod) => mod.DashboardLayoutModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./views/pagenotfound/pagenotfound.module').then(
        (mod) => mod.PagenotfoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
