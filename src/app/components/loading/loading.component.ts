import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  template: `
    @if (isLoading()) {
      <div class="loading-container">
        <mat-spinner [diameter]="50"></mat-spinner>
        <p class="loading-text">{{ message() || 'Loading weather data...' }}</p>
      </div>
    }
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 16px;
      gap: 16px;
    }

    .loading-text {
      margin: 0;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.6);
      text-align: center;
    }
  `],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class LoadingComponent {
  isLoading = input.required<boolean>();
  message = input<string>();
}
