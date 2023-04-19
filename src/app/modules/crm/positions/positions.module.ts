import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';

import { PositionFormComponent } from './position-form/position-form.component';
import { PositionsComponent } from './positions.component';
import { PositionsRoutingModule } from './positions-routing.module';
import { PositionsTableComponent } from './positions-table/positions-table.component';
import { PositionFormModalService } from './services/position-form-modal.service';
import { PositionsService } from './services/positions.service';

@NgModule({
  declarations: [PositionsComponent, PositionsTableComponent, PositionFormComponent],
  imports: [CommonModule, SharedModule, PositionsRoutingModule],
  providers: [PositionsService, PositionFormModalService],
})
export class PositionsModule {}
