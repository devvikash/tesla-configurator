import { Component, OnInit } from '@angular/core';
import { OptimizedImageComponent } from '../common/optimized-image/optimized-image.component';
import { StepValidationService } from '../../shared/services/step-validation.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [
    OptimizedImageComponent,
    CurrencyPipe
  ],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent implements OnInit {
  public carImagePath?: string;
  public carImageAltText?: string;
  public additionalFeatureCost: number = 1000;
  public totalPrice: number = 0;
  constructor(
    public _stepValidationService: StepValidationService
  ) { }

  public ngOnInit(): void {
    this.updateInitialFormGroup();
  }

  private updateInitialFormGroup() {
    const model = this._stepValidationService.pickedCarModel();
    if (model) {
      this.carImagePath = this._stepValidationService.imageUrlPath() as string;
      this.carImageAltText = this._stepValidationService.imageAltText() as string;
    }
    this.calculateTotalPrice();
  }

  private calculateTotalPrice() {
    const carColorPrice = this._stepValidationService.pickedCarColor()?.price || 0;
    const carConfigPrice = this._stepValidationService.pickedCarConfiguration()?.price || 0;
    const towPrice = this._stepValidationService.isTowHitch() ? this.additionalFeatureCost : 0;
    const yokePrice = this._stepValidationService.isYoke() ? this.additionalFeatureCost : 0;

    this.totalPrice = carColorPrice + carConfigPrice + towPrice + yokePrice;
  }
}
