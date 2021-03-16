import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthService } from './core/auth/services/auth.service';
import { LayoutContainerComponent } from './shared/modules/layout/layout-container/layout-container.component';


const routes: Routes = [
  {
    path: '', component: LayoutContainerComponent, children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../app/modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'customers',
        loadChildren: () => import('../app/modules/customers/customers.module').then(m => m.CustomersModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'releaseOrder',
        loadChildren: () => import('../app/modules/release-order/release-order.module').then(m => m.ReleaseOrderModule)
      },
      {
        path: 'bills',
        loadChildren: () => import('../app/modules/bills/bills.module').then(m => m.BillsModule)
      },
      {
        path: 'publications',
        loadChildren: () => import('../app/modules/publications/publications.module').then(m => m.PublicationsModule),
        canActivate:[AuthGuard]
      }
    ]
  },
  {
    path:'auth',
    loadChildren: () => import('../app/core/auth/auth.module').then(m => m.AuthModule)//component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
