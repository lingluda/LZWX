import {BaseHttpInterceptorService} from './shared/BaseHttpInterceptorService.service';
import {AuthInterceptor} from './shared/AuthInterceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BaseHttpInterceptorService, multi: true },
];
