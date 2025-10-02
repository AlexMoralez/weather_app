import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-display',
  template: `
    @if (errorMessage()) {
      <mat-card class="error-card">
        <mat-card-content>
          <div class="error-content">
            <mat-icon class="error-icon">error</mat-icon>
            <div class="error-text">
              <h3>Oops! Something went wrong</h3>
              <p>{{ errorMessage() }}</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    }
  `,
  styles: [`
    .error-card {
      max-width: 600px;
      margin: 16px auto;
      background-color: #ffebee;
      border-left: 4px solid #f44336;
    }

    .error-content {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .error-icon {
      color: #f44336;
      font-size: 32px;
      width: 32px;
      height: 32px;
      flex-shrink: 0;
      margin-top: 4px;
    }

    .error-text h3 {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 500;
      color: #c62828;
    }

    .error-text p {
      margin: 0;
      color: #d32f2f;
      line-height: 1.4;
    }

    @media (max-width: 600px) {
      .error-content {
        gap: 12px;
      }

      .error-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }

      .error-text h3 {
        font-size: 16px;
      }
    }
  `],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ErrorDisplayComponent {
  errorMessage = input<string | null>(null);
}
