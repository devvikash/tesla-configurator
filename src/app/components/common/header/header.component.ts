import { Component, inject } from '@angular/core';
import { StepValidationService } from '../../../shared/services/step-validation.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public stepValidationService = inject(StepValidationService);
}
