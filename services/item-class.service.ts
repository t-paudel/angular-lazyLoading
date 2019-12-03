import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpResponse, HttpClient, HttpParams } from '@angular/common/http';
import { IItemclass } from 'app/shared/model/product/itemclass.model';
import { createRequestOption } from 'app/shared';

type EntityResponseType = HttpResponse<IItemclass>;
type EntityArrayResponseType = HttpResponse<IItemclass[]>;

@Injectable({
  providedIn: 'root'
})
export class ItemClassService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/itemclasses';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemclass[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
