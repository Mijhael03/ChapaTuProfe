import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ValidatorService {
    constructor() { }

    isIntegerValue(value: string): boolean {
        return /^-?\d*$/.test(value);
    }

    isNumberPositiveValue(value: string): boolean {
        return /^\d*$/.test(value);
    }

    isAlphanumericValue(value: string): string {
        return value.replace(/[^a-zA-Z0-9]+/g, '');
    }
}