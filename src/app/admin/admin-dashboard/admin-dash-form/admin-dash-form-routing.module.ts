import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashFormPage } from './admin-dash-form.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDashFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashFormPageRoutingModule {}
