import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/modules/shared.module';
import { CrmComponent } from './crm.component';
import { CrmRoutingModule } from './crm-routing.module';

@NgModule({
  declarations: [CrmComponent],
  imports: [CommonModule, SharedModule, CrmRoutingModule],
})
export class CrmModule {}
