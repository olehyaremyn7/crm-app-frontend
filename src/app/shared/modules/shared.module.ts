import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertComponent } from '../components/alert/alert.component';
import { ButtonLoaderComponent } from '../components/button-loader/button-loader.component';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { NoDataComponent } from '../components/no-data/no-data.component';
import { AlertService } from '../services/alert.service';
import { ConfirmService } from '../services/confirm.service';
import { NotificationService } from '../services/notification.service';
import { RetryService } from '../services/retry.service';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  declarations: [LoaderComponent, AlertComponent, ConfirmComponent, ButtonLoaderComponent, NoDataComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    AlertComponent,
    ConfirmComponent,
    ButtonLoaderComponent,
    NoDataComponent,
  ],
  providers: [RetryService, AlertService, ConfirmService, NotificationService],
})
export class SharedModule {}
