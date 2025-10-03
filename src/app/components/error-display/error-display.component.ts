import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrl: './error-display.component.scss',
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
