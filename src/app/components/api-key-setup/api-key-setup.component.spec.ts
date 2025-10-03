import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiKeySetupComponent } from './api-key-setup.component';

describe('ApiKeySetupComponent', () => {
  let component: ApiKeySetupComponent;
  let fixture: ComponentFixture<ApiKeySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApiKeySetupComponent,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ApiKeySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form validation', () => {
    expect(component.apiKeyControl.invalid).toBe(true);
    expect(component.apiKeyControl.hasError('required')).toBe(true);
  });

  it('should validate minimum length', () => {
    component.apiKeyControl.setValue('short');
    expect(component.apiKeyControl.invalid).toBe(true);
    expect(component.apiKeyControl.hasError('minlength')).toBe(true);
  });

  it('should be valid with proper API key', () => {
    component.apiKeyControl.setValue('validapikeytest1234567890123456');
    expect(component.apiKeyControl.valid).toBe(true);
  });

  it('should disable submit button when form is invalid', () => {
    expect(component.isSubmitDisabled()).toBe(true);
  });

  it('should enable submit button when form is valid', () => {
    component.apiKeyControl.setValue('validapikeytest1234567890123456');
    expect(component.isSubmitDisabled()).toBe(false);
  });

  it('should emit API key on submit', () => {
    spyOn(component.apiKeySubmitted, 'emit');

    component.apiKeyControl.setValue('validapikeytest1234567890123456');
    component.onSubmit();

    expect(component.apiKeySubmitted.emit).toHaveBeenCalledWith('validapikeytest1234567890123456');
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword()).toBe(false);

    component.togglePasswordVisibility();

    expect(component.showPassword()).toBe(true);
  });

  it('should not submit with invalid form', () => {
    spyOn(component.apiKeySubmitted, 'emit');

    component.apiKeyControl.setValue('');
    component.onSubmit();

    expect(component.apiKeySubmitted.emit).not.toHaveBeenCalled();
  });
});
