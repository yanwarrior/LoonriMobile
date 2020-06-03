import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceptanceCreatePage } from './acceptance-create.page';

const routes: Routes = [
  {
    path: '',
    component: AcceptanceCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceptanceCreatePageRoutingModule {}
