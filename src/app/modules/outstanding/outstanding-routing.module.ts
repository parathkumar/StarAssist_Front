import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutstandingContainerComponent } from './outstanding-container/outstanding-container.component';


const routes: Routes = [
  {
    path:'',
    component:OutstandingContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutstandingRoutingModule { }
