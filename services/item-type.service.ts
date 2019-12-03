import { Injectable } from '@angular/core';
import { HttpResponse, HttpParams, HttpClient } from '@angular/common/http';
import { IItemType } from 'app/shared/model/product/item-type.model';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';

type EntityResponseType = HttpResponse<IItemType>;
type EntityArrayResponseType = HttpResponse<IItemType[]>;

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/item-types';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
