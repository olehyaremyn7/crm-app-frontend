import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/modules/shared.module';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesService } from './services/categories.service';
import { CategoryFormModalService } from './services/category-form-modal.service';

@NgModule({
  declarations: [CategoriesComponent, CategoriesTableComponent, CategoryFormComponent],
  imports: [CommonModule, SharedModule, CategoriesRoutingModule],
  providers: [CategoriesService, CategoryFormModalService],
})
export class CategoriesModule {}
