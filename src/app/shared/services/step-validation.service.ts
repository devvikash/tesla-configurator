import { Injectable, computed, signal } from '@angular/core';
import { CarModel, Colors, Configuration } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StepValidationService {
  public pickedCarModel = signal<CarModel | null>(null);
  public pickedCarColor = signal<Colors | null>(null);
  public pickedCarConfiguration = signal<Configuration | null>(null);
  public imageUrlPath = signal<string | null>(null);
  public imageAltText = signal<string | null>(null);
  public isTowHitch = signal<boolean | null>(null);
  public isYoke = signal<boolean | null>(null);

  public isStepOneValid = computed(() => {
    return !!this.pickedCarModel() && !!this.pickedCarColor();
  });
  public isStepTwoValid = computed(() => {
    return this.isStepOneValid() && !!this.pickedCarConfiguration();
  });

  carModelSelected(selectedModel: CarModel | null) {
    if (selectedModel) {
      this.pickedCarModel.set(selectedModel);
    } else {
      this.pickedCarModel.set(null);
    }
  }

  carColorSelected(selectedColor: Colors | null) {
    if (selectedColor) {
      this.pickedCarColor.set(selectedColor);
    } else {
      this.pickedCarColor.set(null);
    }
  }

  carModelConfigSelected(selectedConfiguration: Configuration | null) {
    if (selectedConfiguration) {
      this.pickedCarConfiguration.set(selectedConfiguration);
    } else {
      this.pickedCarConfiguration.set(null);
    };
  }

  updateImagePath(imagePath: string, description: string) {
    this.imageUrlPath.set(imagePath);
    this.imageAltText.set(description);
  }

  includeTawHitchAndYoke(isTow: boolean, isYoke: boolean) {
    this.isTowHitch.set(isTow);
    this.isYoke.set(isYoke);
  }
}
