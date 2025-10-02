import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-api-key-setup',
  template: `
    <div class="setup-container">
      <mat-card class="setup-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>key</mat-icon>
            API Key Configuration
          </mat-card-title>
          <mat-card-subtitle>
            Enter your OpenWeatherMap API key to start using the weather app
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="instructions">
            <p>To get your free API key:</p>
            <ol>
              <li>Visit <a href="https://openweathermap.org/api" target="_blank" rel="noopener">OpenWeatherMap</a></li>
              <li>Sign up for a free account</li>
              <li>Go to "My API keys" in your account</li>
              <li>Generate a new API key if needed</li>
              <li>Copy your API key (32 characters) and paste it below</li>
              <li><strong>Important:</strong> New API keys can take up to 2 hours to activate!</li>
            </ol>
          </div>

          <mat-form-field class="api-key-field" appearance="outline">
            <mat-label>OpenWeatherMap API Key</mat-label>
            <input
              matInput
              type="password"
              [formControl]="apiKeyControl"
              placeholder="Enter your API key"
              (keyup.enter)="onSubmit()"
            />
            <button
              mat-icon-button
              matSuffix
              (click)="togglePasswordVisibility()"
              type="button"
            >
              <mat-icon>{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            <mat-error *ngIf="apiKeyControl.hasError('required')">
              API key is required
            </mat-error>
            <mat-error *ngIf="apiKeyControl.hasError('minlength')">
              API key must be at least 10 characters long
            </mat-error>
            <mat-error *ngIf="apiKeyControl.hasError('invalidLength')">
              OpenWeatherMap API keys are typically 32 characters long
            </mat-error>
          </mat-form-field>

          <div class="note">
            <mat-icon>info</mat-icon>
            <span>Your API key is stored locally and never sent to our servers.</span>
          </div>
        </mat-card-content>

        <mat-card-actions align="end">
          <button
            mat-raised-button
            color="primary"
            [disabled]="apiKeyControl.invalid"
            (click)="onSubmit()"
          >
            Save API Key
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .setup-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 16px;
    }

    .setup-card {
      max-width: 500px;
      width: 100%;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .instructions {
      margin-bottom: 24px;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }

    .instructions p {
      margin: 0 0 12px 0;
      font-weight: 500;
    }

    .instructions ol {
      margin: 0;
      padding-left: 20px;
    }

    .instructions li {
      margin-bottom: 8px;
    }

    .instructions a {
      color: var(--color-primary-dark, #15719f);
      text-decoration: none;
    }

    .instructions a:hover {
      text-decoration: underline;
    }

    .api-key-field {
      width: 100%;
      margin-bottom: 16px;
    }

    .note {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 16px;
    }

    .note mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    @media (max-width: 600px) {
      .setup-container {
        padding: 8px;
      }
    }
  `],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class ApiKeySetupComponent {
  apiKeyControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10)
  ]);

  showPassword = signal(false);

  // Output
  apiKeySubmitted = output<string>();

  onSubmit(): void {
    if (this.apiKeyControl.valid && this.apiKeyControl.value) {
      const apiKey = this.apiKeyControl.value.trim();
      if (apiKey) {
        // Basic validation - OpenWeatherMap API keys are typically 32 characters
        if (apiKey.length !== 32) {
          this.apiKeyControl.setErrors({ 'invalidLength': true });
          return;
        }

        this.apiKeySubmitted.emit(apiKey);
      }
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(show => !show);
    const input = document.querySelector('.api-key-field input') as HTMLInputElement;
    if (input) {
      input.type = this.showPassword() ? 'text' : 'password';
    }
  }
}
