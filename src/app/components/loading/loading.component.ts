import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class LoadingComponent {
  isLoading = input.required<boolean>();
  message = input<string>();
}
