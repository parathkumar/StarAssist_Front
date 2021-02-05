import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersContainerComponent } from './components/customers-container/customers-container.component';
import { SharedImportsModule } from 'src/app/shared/modules/shared-imports/shared-imports.module';
import { CustomerActionsModalComponent } from './components/customer-actions-modal/customer-actions-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { customerModalConfig } from './constants/ModalConfigs';



@NgModule({
  declarations: [CustomersContainerComponent, CustomerActionsModalComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedImportsModule,
    ReactiveFormsModule,
  ],
  // providers:[customerModalConfig]
})
export class CustomersModule { }
