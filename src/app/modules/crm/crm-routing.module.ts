import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrmComponent } from './crm.component';

const routes: Routes = [
  {
    path: '',
    component: CrmComponent,
    children: [
      {
        path: '',
        redirectTo: '/overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then((m) => m.OverviewModule),
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'history',
        loadChildren: () => import('./history/history.module').then((m) => m.HistoryModule),
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then((m) => m.CategoriesModule),
      },
      {
        path: 'analytics',
        loadChildren: () => import('./analytics/analytics.module').then((m) => m.AnalyticsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
