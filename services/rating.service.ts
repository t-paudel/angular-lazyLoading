import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IRating } from 'app/shared/model/product/rating.model';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared';

type EntityResponseType = HttpResponse<IRating>;
type EntityArrayResponseType = HttpResponse<IRating[]>;

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/ratings';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRating[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
