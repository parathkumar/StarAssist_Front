import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersContainerComponent } from './components/customers-container/customers-container.component';


const routes: Routes = [
  {
    path:'',
    component:CustomersContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
