import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckNullUndefinedUtilService {
  constructor() {}

  public isNullOrUndefined(value: any): boolean {
    return value === undefined || value === null || value.length < 1;
  }
}
