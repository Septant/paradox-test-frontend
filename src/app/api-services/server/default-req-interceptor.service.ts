import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, of, take} from 'rxjs';
import {TuiAlertService} from "@taiga-ui/core";

@Injectable()
export class DefaultReqInterceptor implements HttpInterceptor {

  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        this.alerts.open('Ошибка запроса!',
          {
            status: 'error',
            autoClose: true,
            hasCloseButton: true,
            label: err.status ? `Статус: ${err.status}` : ''
          }
        ).pipe((take(1))).subscribe();
        return of(err);
      })
    );
  }
}
