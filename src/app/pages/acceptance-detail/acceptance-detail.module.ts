import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptanceDetailPageRoutingModule } from './acceptance-detail-routing.module';

import { AcceptanceDetailPage } from './acceptance-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceptanceDetailPageRoutingModule
  ],
  declarations: [AcceptanceDetailPage]
})
export class AcceptanceDetailPageModule {}
