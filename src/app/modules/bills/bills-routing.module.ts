import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillsContainerComponent } from './bills-container/bills-container.component';


const routes: Routes = [
  {
    path:'',
    component:BillsContainerComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillsRoutingModule { }
