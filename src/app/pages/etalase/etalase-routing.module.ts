import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtalasePage } from './etalase.page';

const routes: Routes = [
  {
    path: '',
    component: EtalasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtalasePageRoutingModule {}
