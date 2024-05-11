import { CanActivateFn } from '@angular/router';
import { StepValidationService } from '../services/step-validation.service';
import { inject } from '@angular/core';

export const stepThreeGuard: CanActivateFn = (route, state) => {
  const stepValidationService = inject(StepValidationService);
  const allowedToMoveStepThree = stepValidationService.isStepTwoValid();

  return allowedToMoveStepThree;
};
