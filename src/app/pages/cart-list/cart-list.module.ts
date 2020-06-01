import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartListPageRoutingModule } from './cart-list-routing.module';

import { CartListPage } from './cart-list.page';
import { CartSummaryComponent } from 'src/app/components/cart-summary/cart-summary.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartListPageRoutingModule
  ],
  declarations: [CartListPage, CartSummaryComponent]
})
export class CartListPageModule {}
