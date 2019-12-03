import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { IStrength } from 'app/shared/model/product/strength.model';
import { createRequestOption } from 'app/shared';

type EntityResponseType = HttpResponse<IStrength>;
type EntityArrayResponseType = HttpResponse<IStrength[]>;

@Injectable({
  providedIn: 'root'
})
export class StrengthService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/strengths';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStrength[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
