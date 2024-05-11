import { Routes } from '@angular/router';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';
import { StepThreeComponent } from './components/step-three/step-three.component';
import { stepTwoGuard } from './shared/guards/step-two.guard';
import { stepThreeGuard } from './shared/guards/step-three.guard';

export const routes: Routes = [
    {
        path: 'step-one',
        component: StepOneComponent
    },
    {
        path: 'step-two',
        component: StepTwoComponent,
        canActivate: [stepTwoGuard]
    },
    {
        path: 'step-three',
        component: StepThreeComponent,
        canActivate: [stepThreeGuard]
    },
    {
        path: '**',
        redirectTo: 'step-one',
        pathMatch: 'full'
    }
];
