export type CarModelCode = 'S' | 'X' | 'C' | '3' | 'Y';
export type CarModelDescription = 'Model S' | 'Model X' | 'Cybertruck' | 'Model 3' | 'Model Y';
export type CarColor = 'white' | 'black' | 'blue' | 'grey' | 'red';

export interface CarModel {
    code: CarModelCode;
    description: CarModelDescription;
    colors: Colors[];
}

export interface Colors {
    code: CarColor;
    description: string;
    price: number;
}

export interface CarModelConfiguration {
    configs: Configuration[];
    towHitch: boolean;
    yoke: boolean;
}

export interface Configuration {
    id: number;
    description: string;
    range: number;
    speed: number;
    price: number;
}