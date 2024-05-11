import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel, CarModelCode, CarModelConfiguration } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private _httpClient: HttpClient
  ) { }

  getCarModels(): Observable<CarModel[]> {
    return this._httpClient.get<CarModel[]>('/models');
  }

  getCarModelConfiguration(carModel: CarModelCode): Observable<CarModelConfiguration> {
    return this._httpClient.get<CarModelConfiguration>('/options/' + carModel)
  }
}
