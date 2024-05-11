import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-optimized-image',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './optimized-image.component.html',
  styleUrl: './optimized-image.component.scss'
})
export class OptimizedImageComponent {
  @Input() imageURL?: string;
  @Input() imageAlternative?: string;
}
