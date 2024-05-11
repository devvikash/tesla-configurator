import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StepValidationService } from '../services/step-validation.service';

export const stepTwoGuard: CanActivateFn = () => {
  const stepValidationService = inject(StepValidationService);
  const router = inject(Router);
  const allowedToMoveStepTwo = stepValidationService.isStepOneValid();
  if (allowedToMoveStepTwo) {
    return true;
  } else {
    router.navigateByUrl('/step-one');
    return false;
  }
};
