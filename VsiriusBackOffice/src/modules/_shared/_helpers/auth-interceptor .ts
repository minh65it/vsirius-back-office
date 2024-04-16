import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('TOKEN');
        if (token) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }
        let correlation = req.headers.get("X-Correlation-Id");
        if (correlation == null) {
            correlation = uuid.v4();
        }
        req = req.clone({
            setHeaders: { 'X-Correlation-Id': correlation }
        });
        return next.handle(req);
    }
}