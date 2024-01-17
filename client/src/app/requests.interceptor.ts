import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import UniCookieService from './services/unicookie.service';


@Injectable()
export class RequestsInterceptor implements HttpInterceptor {

  private readonly rootEndPoint = `http://localhost:3000/api/v1`;

  constructor(private unicookieService: UniCookieService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      url: `${this.rootEndPoint}${request.url}`,
    })
    return next.handle(newRequest);
  }
}
