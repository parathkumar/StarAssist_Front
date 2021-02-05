import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('../app/modules/customers/customers.module').then(m=> m.CustomersModule)
  },
  {
    path: 'releaseOrder',
    loadChildren: () => import('../app/modules/release-order/release-order.module').then(m=>m.ReleaseOrderModule)
  },
  {
    path: 'bills',
    loadChildren: () => import('../app/modules/bills/bills.module').then(m=>m.BillsModule)
  },
  // {
  //   path: 'outstanding',
  //   loadChildren: () => import('../app/modules/outstanding/outstanding.module').then(m=>m.OutstandingModule)
  // }
  {
    path: 'publications',
    loadChildren: () => import('../app/modules/publications/publications.module').then(m=>m.PublicationsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
