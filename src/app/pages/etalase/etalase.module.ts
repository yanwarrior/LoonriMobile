import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtalasePageRoutingModule } from './etalase-routing.module';

import { EtalasePage } from './etalase.page';
import { CartCounterComponent } from 'src/app/components/cart-counter/cart-counter.component';
// import { CartCounterComponent } from 'src/app/components/cart-counter/cart-counter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtalasePageRoutingModule
  ],
  declarations: [
    EtalasePage,
    CartCounterComponent
  ]
})
export class EtalasePageModule {}
