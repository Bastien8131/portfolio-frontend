import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-container" [class.overlay]="overlay">
      <div class="loader">
        <div class="spinner"></div>
        <div class="message" *ngIf="message">{{ message }}</div>
      </div>
    </div>
  `,
  styles: `
    .loader-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;

      &.overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.7);
        z-index: 1000;
      }
    }

    .loader {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top-color: #423d6e;
      animation: spin 1s ease-in-out infinite;
    }

    .message {
      font-size: 14px;
      color: #423d6e;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `
})
export class LoaderComponent {
  @Input() message: string = 'Chargement...';
  @Input() overlay: boolean = false;
}
