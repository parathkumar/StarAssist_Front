import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicationsContainerComponent } from './components/publications-container/publications-container.component';


const routes: Routes = [
  {
    path:'',
    component:PublicationsContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicationsRoutingModule { }
