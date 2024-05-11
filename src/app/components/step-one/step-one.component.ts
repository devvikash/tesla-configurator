import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OptimizedImageComponent } from '../common/optimized-image/optimized-image.component';
import { Subscription } from 'rxjs';
import { CarModel, Colors } from '../../shared/models';
import { StepValidationService } from '../../shared/services/step-validation.service';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    OptimizedImageComponent
  ],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent implements OnInit, OnDestroy {
  public apiSubscription!: Subscription;
  public stepOneFormGroup!: FormGroup;
  public availableCarModelList: CarModel[] = [];
  public selectedCarModel!: CarModel | undefined;
  public carImagePath?: string;
  public carImageAltText?: string;
  constructor(
    private _dataService: DataService,
    private _formBuilder: FormBuilder,
    private _stepValidationService: StepValidationService
  ) {
    this.stepOneFormGroup = this._formBuilder.group({
      carModel: new FormControl<string>('', { nonNullable: true }),
      carColor: new FormControl<string>('', { nonNullable: true })
    })
  }

  public ngOnInit(): void {
    this.fetchCarModel();
  }

  private updateInitialFormGroup() {
    const model = this._stepValidationService.pickedCarModel();
    const color = this._stepValidationService.pickedCarColor();

    if (model && color) {
      this.stepOneFormGroup.patchValue({
        carModel: model.description,
        carColor: color.code
      });
      this.selectedCarModel = model;
      this.carImagePath = this._stepValidationService.imageUrlPath() as string;
      this.carImageAltText = this._stepValidationService.imageAltText() as string;
    }
  }

  private fetchCarModel() {
    this.apiSubscription = this._dataService.getCarModels()
      .subscribe({
        next: (record: CarModel[]) => {
          this.availableCarModelList = record;
          // show step 1 car detail with selected values if available
          this.updateInitialFormGroup();
        },
        error: err => console.error(err),
        complete: () => console.log("Step 1 data loaded...")
      })
  }

  public onCarModelChange(event: Event): void {
    this.resetImagePath();
    const selectedModel = (event.target as HTMLInputElement).value;
    if (selectedModel) {
      this.selectedCarModel = this.availableCarModelList.find(model => model.description === selectedModel) as CarModel;
      this._stepValidationService.carModelSelected(this.selectedCarModel);

      // select first color when choose car model
      const defaultColor = this.selectedCarModel.colors[0];
      this._stepValidationService.carColorSelected(defaultColor);
      this.stepOneFormGroup.get('carColor')?.setValue(defaultColor.code);
      this.createCarImageURL(this.selectedCarModel.code, defaultColor.code, defaultColor.description);
      // Reset configuration to default on model change
      this._stepValidationService.carModelConfigSelected(null);
    } else {
      this._stepValidationService.carModelSelected(null);
      this._stepValidationService.carColorSelected(null);
      this._stepValidationService.carModelConfigSelected(null);
      this.selectedCarModel = undefined;
    }
  }

  public onCarModelColorChange(event: Event): void {
    const selectedColor = (event.target as HTMLInputElement).value;
    if (selectedColor && this.selectedCarModel) {
      const selectedColorDetail = this.selectedCarModel.colors.find(c => c.code === selectedColor) as Colors;
      this._stepValidationService.carColorSelected(selectedColorDetail);
      this.createCarImageURL(this.selectedCarModel!.code, selectedColorDetail.code, selectedColorDetail.description)
    }
  }

  public createCarImageURL(model: string, color: string, description: string) {
    this.carImagePath = 'https://interstate21.com/tesla-app/images/' + model + '/' + color + '.jpg';
    this.carImageAltText = description;
    this._stepValidationService.updateImagePath(this.carImagePath, this.carImageAltText);
  }

  public resetImagePath() {
    this.carImagePath = '';
    this.carImageAltText = '';
  }

  public ngOnDestroy(): void {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }
}
