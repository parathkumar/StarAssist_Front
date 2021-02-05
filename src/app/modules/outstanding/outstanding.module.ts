import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutstandingRoutingModule } from './outstanding-routing.module';
import { OutstandingContainerComponent } from './outstanding-container/outstanding-container.component';


@NgModule({
  declarations: [OutstandingContainerComponent,],
  imports: [
    CommonModule,
    OutstandingRoutingModule
  ]
})
export class OutstandingModule { }
