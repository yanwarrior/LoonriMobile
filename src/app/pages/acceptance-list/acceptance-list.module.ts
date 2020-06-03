import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptanceListPageRoutingModule } from './acceptance-list-routing.module';

import { AcceptanceListPage } from './acceptance-list.page';
import { CartCounterComponent } from 'src/app/components/cart-counter/cart-counter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceptanceListPageRoutingModule
  ],
  declarations: [
    AcceptanceListPage,
    CartCounterComponent
  ]
})
export class AcceptanceListPageModule {}
