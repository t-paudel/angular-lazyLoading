import { Injectable } from '@angular/core';
import { HttpResponse, HttpParams, HttpClient } from '@angular/common/http';
import { IItemStatus } from 'app/shared/model/product/item-status.model';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';

type EntityResponseType = HttpResponse<IItemStatus>;
type EntityArrayResponseType = HttpResponse<IItemStatus[]>;

@Injectable({
  providedIn: 'root'
})
export class ItemStatusService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/item-statuses';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
