import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IItemformType } from 'app/shared/model/product/itemform-type.model';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared';

type EntityResponseType = HttpResponse<IItemformType>;
type EntityArrayResponseType = HttpResponse<IItemformType[]>;

@Injectable({
  providedIn: 'root'
})
export class ItemFormTypeService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/itemform-types';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemformType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
