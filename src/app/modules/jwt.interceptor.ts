import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';
@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(public auth: JwtService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }
}