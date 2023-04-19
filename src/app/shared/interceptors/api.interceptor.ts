import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

const { API_ENDPOINT } = environment;

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<void>, next: HttpHandler): Observable<HttpEvent<Observable<HttpErrorResponse>>> {
    req = req.clone({ url: `${API_ENDPOINT}/api/${req.url}` });
    
    return next.handle(req);
  }
}
