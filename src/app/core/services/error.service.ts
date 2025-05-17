import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppError {
  source: string;
  message: string;
  timestamp: Date;
  details?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorsSubject = new BehaviorSubject<AppError[]>([]);
  errors$ = this.errorsSubject.asObservable();

  constructor() {}

  addError(source: string, message: string, details?: any): void {
    const error: AppError = {
      source,
      message,
      timestamp: new Date(),
      details
    };

    const currentErrors = this.errorsSubject.getValue();
    this.errorsSubject.next([...currentErrors, error]);

    // Log to console as well for debugging
    console.error(`Error in ${source}: ${message}`, details);
  }

  clearErrors(): void {
    this.errorsSubject.next([]);
  }

  getErrors(): AppError[] {
    return this.errorsSubject.getValue();
  }
}
