import { Injectable, inject } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpHandlerFn,
    HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'app/services/auth.service';
import { AuthenticationGirisResponse } from '../../../../dist/api-client-lib';

export function ApiInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    let authService = inject(AuthService);
    let user!: AuthenticationGirisResponse;
    authService._currentUser.subscribe(res => {
        user = res!;
    });


    let url = req.url.replace('192.168.1.26:8080', 'localhost:8080');
    const dupReq = req.clone({
        url: url,
        headers: req.headers.set('Authorization', `Bearer ` + (user ? user.token! : '')),
    });
    console.log(dupReq);

    return next(dupReq).pipe(tap(event => {
        if (event.type === HttpEventType.Response) {
            // console.log(req.url, 'returned a response with status', event.status);
        }
    }));
}