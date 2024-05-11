import { CanActivateFn, Router } from '@angular/router';
import { StepValidationService } from '../services/step-validation.service';
import { inject } from '@angular/core';

export const stepThreeGuard: CanActivateFn = () => {
  const stepValidationService = inject(StepValidationService);
  const router = inject(Router);
  const allowedToMoveStepThree = stepValidationService.isStepTwoValid();

  if (allowedToMoveStepThree) {
    return true;
  } else {
    router.navigateByUrl('/step-one');
    return false;
  }
};
