import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { ErrorDisplayComponent } from './error-display.component';

describe('ErrorDisplayComponent', () => {
  let component: ErrorDisplayComponent;
  let fixture: ComponentFixture<ErrorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ErrorDisplayComponent,
        MatIconModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display anything when no error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent?.trim()).toBe('');
  });

  it('should display error card when error message is provided', () => {
    fixture.componentRef.setInput('errorMessage', 'Test error message');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card')).toBeTruthy();
    expect(compiled.querySelector('mat-icon')).toBeTruthy();
    expect(compiled.querySelector('mat-icon')?.textContent?.trim()).toBe('error');
  });

  it('should display custom error message when provided', () => {
    fixture.componentRef.setInput('errorMessage', 'Failed to load weather data');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Failed to load weather data');
    expect(compiled.textContent).toContain('Oops! Something went wrong');
  });

  it('should have proper CSS classes when error is shown', () => {
    fixture.componentRef.setInput('errorMessage', 'Test error');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('mat-card');
    const icon = compiled.querySelector('mat-icon');
    expect(card?.classList).toContain('error-card');
    expect(icon?.classList).toContain('error-icon');
  });
});
