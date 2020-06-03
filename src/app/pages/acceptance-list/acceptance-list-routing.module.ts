import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceptanceListPage } from './acceptance-list.page';

const routes: Routes = [
  {
    path: '',
    component: AcceptanceListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceptanceListPageRoutingModule {}
