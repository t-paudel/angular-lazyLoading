import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IItemPricingQualifier } from 'app/shared/model/product/item-pricing-qualifier.model';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

type EntityResponseType = HttpResponse<IItemPricingQualifier>;
type EntityArrayResponseType = HttpResponse<IItemPricingQualifier[]>;

@Injectable({
  providedIn: 'root'
})
export class ItemPricingQualifierService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/item-pricing-qualifiers';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IItemPricingQualifier[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IItemPricingQualifier>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findArray(id?: any) {
    const options = createRequestOption(id);
    return this.http
      .get(this.resourceUrl + '/find-multiple', { params: options })
      .pipe(map(res => this.convertDateArrayFromServerTemp(res)));
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((itemPricingQualifier: IItemPricingQualifier) => {
        itemPricingQualifier.createdDate = itemPricingQualifier.createdDate != null ? moment(itemPricingQualifier.createdDate) : null;
        itemPricingQualifier.modifiedDate = itemPricingQualifier.modifiedDate != null ? moment(itemPricingQualifier.modifiedDate) : null;
      });
    }
    return res;
  }

  protected convertDateArrayFromServerTemp(res) {
    if (res.body) {
      res.body.forEach((itemPricingQualifier: IItemPricingQualifier) => {
        itemPricingQualifier.createdDate = itemPricingQualifier.createdDate != null ? moment(itemPricingQualifier.createdDate) : null;
        itemPricingQualifier.modifiedDate = itemPricingQualifier.modifiedDate != null ? moment(itemPricingQualifier.modifiedDate) : null;
      });
    }
    return res;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
      res.body.modifiedDate = res.body.modifiedDate != null ? moment(res.body.modifiedDate) : null;
    }
    return res;
  }
}
