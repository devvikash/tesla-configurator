import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OptimizedImageComponent } from '../common/optimized-image/optimized-image.component';
import { Subscription } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import { StepValidationService } from '../../shared/services/step-validation.service';
import { CurrencyPipe } from '@angular/common';
import { CarModelCode, CarModelConfiguration, Configuration } from '../../shared/models';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    OptimizedImageComponent,
    CurrencyPipe
  ],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent implements OnInit, OnDestroy {
  public apiSubscription!: Subscription;
  public stepTwoFormGroup!: FormGroup;
  public availableCarConfigurations: CarModelConfiguration | null = null;
  public selectedCarConfiguration: Configuration | null = null;
  public carImagePath?: string;
  public carImageAltText?: string;
  constructor(
    private _dataService: DataService,
    private _formBuilder: FormBuilder,
    private _stepValidationService: StepValidationService
  ) {
    this.stepTwoFormGroup = this._formBuilder.group({
      carConfiguration: new FormControl<string>('', { nonNullable: true }),
      isTowHitch: new FormControl<boolean>(false, { nonNullable: true }),
      isYokeSteeringWheel: new FormControl<boolean>(false, { nonNullable: true })
    })
  }

  public ngOnInit(): void {
    this.updateInitialFormGroup();
  }

  private updateInitialFormGroup() {
    const model = this._stepValidationService.pickedCarModel();
    const configuration = this._stepValidationService.pickedCarConfiguration();
    if (model) {
      this.carImagePath = this._stepValidationService.imageUrlPath() as string;
      this.carImageAltText = this._stepValidationService.imageAltText() as string;
      this.fetchConfigurationOptionsByModelID(model.code, configuration);
    }
  }

  private fetchConfigurationOptionsByModelID(modelCode: CarModelCode, configuration: Configuration | null) {
    this.apiSubscription = this._dataService.getCarModelConfiguration(modelCode).subscribe({
      next: (record: CarModelConfiguration) => {
        this.availableCarConfigurations = record;
        if (configuration) {
          this.stepTwoFormGroup.patchValue({
            carConfiguration: configuration.description,
            isTowHitch: this._stepValidationService.isTowHitch(),
            isYokeSteeringWheel: this._stepValidationService.isYoke()
          });
          this.selectedCarConfiguration = configuration;
        } else {
          const { towHitch, yoke } = this.availableCarConfigurations;
          this.stepTwoFormGroup.patchValue({
            isTowHitch: towHitch,
            isYokeSteeringWheel: yoke
          });
        }
      },
      error: err => console.error(err),
      complete: () => console.log("Step 2 data loaded...")
    })
  }

  public onCarConfigurationChange(event: Event): void {
    const selectedConfiguration = (event.target as HTMLInputElement).value;
    if (selectedConfiguration) {
      this.selectedCarConfiguration = this.availableCarConfigurations?.configs.find(conf => conf.description == selectedConfiguration) as Configuration;
      this._stepValidationService.carModelConfigSelected(this.selectedCarConfiguration);
    } else {
      this.selectedCarConfiguration = null;
      this._stepValidationService.carModelConfigSelected(null);
    }
  }

  public ngOnDestroy(): void {
    const { isTowHitch, isYokeSteeringWheel } = this.stepTwoFormGroup.value;
    this._stepValidationService.includeTawHitchAndYoke(isTowHitch, isYokeSteeringWheel);
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }
}
