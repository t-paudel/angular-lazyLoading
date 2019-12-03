import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IUdc } from 'app/shared/model/product/udc.model';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared';

type EntityResponseType = HttpResponse<IUdc>;
type EntityArrayResponseType = HttpResponse<IUdc[]>;

@Injectable({
  providedIn: 'root'
})
export class UdcService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/udcs';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUdc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
