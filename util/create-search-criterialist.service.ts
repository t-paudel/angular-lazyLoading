import { Injectable } from '@angular/core';
import { SearchCriteria } from '../model/common/searchcriteria.model';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreateSearchCriterialistService {
  criteriaList: Array<SearchCriteria>;

  constructor() {}

  createSearchCriteriaList(formGroup: FormGroup) {
    this.criteriaList = new Array<SearchCriteria>();
    for (const field in formGroup.controls) {
      if (formGroup.controls[field].value != null && formGroup.controls[field].value !== '') {
        const control: FormControl = <FormControl>formGroup.controls[field];
        const searchCriteria: SearchCriteria = new SearchCriteria();
        searchCriteria.fieldId = field;
        searchCriteria.value = control.value;
        if (typeof control.value === 'string' && control.value.includes('*')) {
          searchCriteria.expression = 'LIKE';
        } else {
          searchCriteria.expression = 'EQUALS';
        }
        this.criteriaList.push(searchCriteria);
      }
    }
    return this.criteriaList;
  }

  createSearchCriteriaWithExp(searchCriteria: SearchCriteria): SearchCriteria {
    if (typeof searchCriteria.fieldValue === 'string' && searchCriteria.fieldValue.includes('*')) {
      searchCriteria.expression = 'LIKE';
      searchCriteria.fieldExpression = 'LIKE';
    } else {
      searchCriteria.expression = 'EQUALS';
      searchCriteria.fieldExpression = 'EQUALS';
    }
    return searchCriteria;
  }
}
