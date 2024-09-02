import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwtToken');
    console.log('Token:', token); // Token'ı konsola yazdır

    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log('Cloned Request Headers:', clonedRequest.headers); // Başlıkları konsola yazdır
      return next.handle(clonedRequest);
    }

    console.log('No token found, sending original request');
    return next.handle(req);
  }
}
