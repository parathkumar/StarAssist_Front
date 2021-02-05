import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReleaseOrderRoutingModule } from './release-order-routing.module';
import { ReleaseOrderContainerComponent } from './release-order-container/release-order-container.component';


@NgModule({
  declarations: [ReleaseOrderContainerComponent],
  imports: [
    CommonModule,
    ReleaseOrderRoutingModule
  ]
})
export class ReleaseOrderModule { }
