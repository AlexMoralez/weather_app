/**
 * Form validation utilities
 */
import { AbstractControl, ValidationErrors } from '@angular/forms';

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
