/**
 * Form validation utilities
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validator for city names
 */
export function cityNameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null; // Let required validator handle empty values
  }

  // Check if contains only letters, spaces, hyphens, and apostrophes
  const validPattern = /^[a-zA-Z\s\-']+$/;
  if (!validPattern.test(value)) {
    return { invalidCityName: true };
  }

  return null;
}

/**
 * Debounce utility for form controls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

/**
 * Validates OpenWeatherMap API key format (more lenient validation)
 */
export function createApiKeyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toString()?.trim() || '';

    if (!value) {
      return null; // Let required validator handle empty values
    }

    // Check minimum length (API keys should be at least 16 characters)
    if (value.length < 16) {
      return { tooShort: { minLength: 16, actualLength: value.length } };
    }

    // Check maximum reasonable length (most API keys are under 64 characters)
    if (value.length > 64) {
      return { tooLong: { maxLength: 64, actualLength: value.length } };
    }

    // Check if contains valid characters (allow alphanumeric and common API key characters)
    const validApiKeyRegex = /^[a-zA-Z0-9_-]+$/;
    if (!validApiKeyRegex.test(value)) {
      return { invalidFormat: { message: 'API key contains invalid characters' } };
    }

    return null;
  };
}
