import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ConsoleLoggingService } from '../logging-service/logging.service';

@Injectable({
  providedIn: 'root',
})
export class LoggingInterceptorService implements HttpInterceptor {

  // TODO: figure out if we can configure which dervived class gets used.
  constructor(private loggingService: ConsoleLoggingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loggingService.log('Logging HTTP Request');
    this.loggingService.log(req);
    return next.handle(req).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          this.loggingService.log('Logging HTTP Response');
          this.loggingService.log(event);
        }
      })
    );
  }
}
