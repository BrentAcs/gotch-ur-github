import { Injectable } from '@angular/core';

export interface ILoggingService {
  enabled: boolean;

  log(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
}

@Injectable({
  providedIn: 'root',
})
export abstract class LoggingService implements ILoggingService {
  enabled: boolean;
  abstract log(message?: any, ...optionalParams: any[]): void;
  abstract info(message?: any, ...optionalParams: any[]): void;
  abstract warn(message?: any, ...optionalParams: any[]): void;
  abstract error(message?: any, ...optionalParams: any[]): void;
}

@Injectable({
  providedIn: 'root',
})
export class ConsoleLoggingService extends LoggingService {
  enabled = true;

  constructor() {
    super();
  }

  log(message?: any, ...optionalParams: any[]): void {
    if (this.enabled) {
      console.log(message, optionalParams);
    }
  }

  info(message?: any, ...optionalParams: any[]): void {
    if (this.enabled) {
      console.info(message, optionalParams);
    }
  }

  warn(message?: any, ...optionalParams: any[]): void {
    if (this.enabled) {
      console.warn(message, optionalParams);
    }
  }

  error(message?: any, ...optionalParams: any[]): void {
    if (this.enabled) {
      console.error(message, optionalParams);
    }
  }
}
