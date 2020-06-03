import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptanceListPageRoutingModule } from './acceptance-list-routing.module';

import { AcceptanceListPage } from './acceptance-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceptanceListPageRoutingModule
  ],
  declarations: [AcceptanceListPage]
})
export class AcceptanceListPageModule {}
