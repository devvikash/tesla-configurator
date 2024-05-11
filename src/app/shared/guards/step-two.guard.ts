import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StepValidationService } from '../services/step-validation.service';

export const stepTwoGuard: CanActivateFn = (route, state) => {
  const stepValidationService = inject(StepValidationService);
  const allowedToMoveStepTwo = stepValidationService.isStepOneValid();

  return allowedToMoveStepTwo;
};
