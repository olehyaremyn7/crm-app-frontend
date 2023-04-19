import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationService } from './modules/authorization/services/authorization.service';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { AuthorizationGuard } from './shared/guards/authorization.guard';
import { CrmGuard } from './shared/guards/crm.guard';
import { ApiInterceptor } from './shared/interceptors/api.interceptor';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { SharedModule } from './shared/modules/shared.module';
import { ErrorService } from './shared/services/error.service';

const INTERCEPTORS_PROVIDER: Provider = [
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: ApiInterceptor,
  },
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor,
  },
];

@NgModule({
  declarations: [AppComponent, NotFoundPageComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [...INTERCEPTORS_PROVIDER, AuthorizationService, AuthorizationGuard, CrmGuard, ErrorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
