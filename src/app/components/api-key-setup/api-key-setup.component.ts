import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { createApiKeyValidator } from '../../utils/form.utils';

@Component({
  selector: 'app-api-key-setup',
  templateUrl: './api-key-setup.component.html',
  styleUrl: './api-key-setup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  // Form controls with modern validators
  apiKeyControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    createApiKeyValidator()
  ]);

  // Signal-based state
  showPassword = signal(false);

  // Convert form control to signals for reactivity
  apiKeyValue = toSignal(this.apiKeyControl.valueChanges, { initialValue: '' });
  apiKeyStatus = toSignal(this.apiKeyControl.statusChanges, { initialValue: 'INVALID' });

  // Computed properties for reactive UI
  isSubmitDisabled = computed(() => {
    const value = this.apiKeyValue()?.trim() || '';
    const isValid = this.apiKeyStatus() === 'VALID';

    return !isValid || value.length < 10;
  });  // Output events
  apiKeySubmitted = output<string>();

  onSubmit(): void {
    if (this.apiKeyControl.valid && this.apiKeyControl.value) {
      const apiKey = this.apiKeyControl.value.trim();
      if (apiKey) {
        this.apiKeySubmitted.emit(apiKey);
      }
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(show => !show);
  }
}
