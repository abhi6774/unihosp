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
import { rootEndPoint } from './rootEndPoint';
// import UniCookieService from './services/unicookie.service';


@Injectable()
export class RequestsInterceptor implements HttpInterceptor {

  private readonly rootEndPoint = rootEndPoint;

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      headers: new HttpHeaders({
        "x-development-key": "86dff15115508c9fb1da8c748740e753",
        "app-id": "eba833927e93be1e8da25766c67f5ef8"
      }),
      withCredentials: true,
      url: `${this.rootEndPoint}${request.url}`,
    })
    return next.handle(newRequest);
  }
}
