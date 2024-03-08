import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from './utils';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const bearerToken = Storage.getItem('Bearer');

    // If Bearer token exists, append it to the headers of the HTTP request
    if (bearerToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
    }

    return next.handle(req);
  }
}
