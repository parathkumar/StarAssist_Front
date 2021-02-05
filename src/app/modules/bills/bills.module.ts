import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { BillsContainerComponent } from './bills-container/bills-container.component';


@NgModule({
  declarations: [BillsContainerComponent],
  imports: [
    CommonModule,
    BillsRoutingModule
  ]
})
export class BillsModule { }
