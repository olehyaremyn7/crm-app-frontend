import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';

import { AuthorizationComponent } from './authorization.component';
import { AuthorizationFormComponent } from './authorization-form/authorization-form.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [AuthorizationComponent, AuthorizationFormComponent, NavbarComponent],
  imports: [CommonModule, SharedModule, AuthorizationRoutingModule],
})
export class AuthorizationModule {}
