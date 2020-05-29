import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptorInterceptor } from './apiinterceptor.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: APIInterceptorInterceptor, multi: true },
];
