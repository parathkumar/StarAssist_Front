import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReleaseOrderContainerComponent } from './components/release-order-container/release-order-container.component';


const routes: Routes = [
  {
    path:'',
    component:ReleaseOrderContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleaseOrderRoutingModule { }
