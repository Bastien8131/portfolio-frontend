import { Component } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf, DatePipe } from '@angular/common';
import { ErrorService, AppError } from '../../../core/services/error.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    DatePipe
  ],
  template: `
    <div *ngIf="(errors$ | async)?.length" class="error-container">
      <div class="error-header">
        <h3>Erreurs</h3>
        <button class="close-btn" (click)="clearErrors()">×</button>
      </div>
      <div class="errors-list">
        <div *ngFor="let error of errors$ | async" class="error-item">
          <div class="error-source">{{ error.source }}</div>
          <div class="error-message">{{ error.message }}</div>
          <div class="error-timestamp">{{ error.timestamp | date:'medium' }}</div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .error-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #fff;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      z-index: 1050;
    }

    .error-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f8d7da;
      color: #721c24;
      padding: 8px 15px;
      border-bottom: 1px solid #f5c6cb;
    }

    .error-header h3 {
      margin: 0;
      font-size: 16px;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #721c24;
    }

    .errors-list {
      max-height: 300px;
      overflow-y: auto;
    }

    .error-item {
      padding: 10px 15px;
      border-bottom: 1px solid #f5c6cb;
    }

    .error-item:last-child {
      border-bottom: none;
    }

    .error-source {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .error-message {
      margin-bottom: 5px;
    }

    .error-timestamp {
      font-size: 12px;
      color: #6c757d;
    }
  `
})
export class ErrorMessageComponent {
  // Typage explicite de l'observable
  errors$: Observable<AppError[]>;

  constructor(private errorService: ErrorService) {
    // Initialisation après la déclaration
    this.errors$ = this.errorService.errors$;
  }

  clearErrors(): void {
    this.errorService.clearErrors();
  }
}
