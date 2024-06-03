import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemLoggingService } from '../_services/system/system-logging.service';
import { NgxNotiflixService } from '../_services/ngx-notiflix.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private systemLoggingService: SystemLoggingService,
        private notiflix: NgxNotiflixService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('TOKEN');
        if (token) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        return new Observable((observer) => {
            next.handle(req).subscribe({
                next: (event: HttpEvent<any>) => {
                    observer.next(event);
                },
                error: (error: any) => {
                    if (error instanceof HttpErrorResponse) {
                        let correlation = error.headers.get('X-Correlation-Id');
                        this.systemLoggingService.writeLogs(error?.toString(), correlation).subscribe({});
                        console.error('API Error:', error.headers);
                        this.notiflix.hideLoading();
                    }
                }
            },
            )
        });
    }
}