import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IUom } from 'app/shared/model/product/uom.model';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared';

type EntityResponseType = HttpResponse<IUom>;
type EntityArrayResponseType = HttpResponse<IUom[]>;

@Injectable({
  providedIn: 'root'
})
export class UomService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/uoms';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUom[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
