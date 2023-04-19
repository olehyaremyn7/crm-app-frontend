import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { AuthorizationGuard } from './shared/guards/authorization.guard';
import { CrmGuard } from './shared/guards/crm.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/authorization/authorization.module').then((m) => m.AuthorizationModule),
    canActivate: [AuthorizationGuard],
    canActivateChild: [AuthorizationGuard],
  },
  {
    path: '',
    loadChildren: () => import('./modules/crm/crm.module').then((m) => m.CrmModule),
    canActivate: [CrmGuard],
    canActivateChild: [CrmGuard],
  },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
