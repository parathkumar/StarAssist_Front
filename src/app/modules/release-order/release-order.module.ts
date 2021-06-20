import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedImportsModule } from 'src/app/shared/modules/shared-imports/shared-imports.module';
import { ReleaseOrderRoutingModule } from './release-order-routing.module';
import { ReleaseOrderContainerComponent } from './components/release-order-container/release-order-container.component';
import { RoActionsModalComponent } from './components/ro-actions-modal/ro-actions-modal.component';
import { AdvancedDatepickerComponent } from './components/ro-actions-modal/advanced-datepicker/advanced-datepicker.component';


@NgModule({
  declarations: [ReleaseOrderContainerComponent, RoActionsModalComponent, AdvancedDatepickerComponent],
  imports: [
    CommonModule,
    ReleaseOrderRoutingModule,
    SharedImportsModule,
    ReactiveFormsModule,
  ]
})
export class ReleaseOrderModule { }
