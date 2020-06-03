import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptanceCreatePageRoutingModule } from './acceptance-create-routing.module';

import { AcceptanceCreatePage } from './acceptance-create.page';
import { CartSummaryComponent } from 'src/app/components/cart-summary/cart-summary.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceptanceCreatePageRoutingModule
  ],
  declarations: [AcceptanceCreatePage, CartSummaryComponent]
})
export class AcceptanceCreatePageModule {}
