import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItemDrtIdentifier } from 'app/shared/model/product/item-drt-identifier.model';
import { HttpResponse, HttpParams, HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { createRequestOption } from 'app/shared';

type EntityResponseType = HttpResponse<IItemDrtIdentifier>;
type EntityArrayResponseType = HttpResponse<IItemDrtIdentifier[]>;

@Injectable({
  providedIn: 'root'
})
export class ItemDrtIdentifierService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/item-drt-identifiers';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IItemDrtIdentifier[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IItemDrtIdentifier>(`${this.resourceUrl}/${id}`, { observe: 'response' })
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
      res.body.forEach((itemDrtIdentifier: IItemDrtIdentifier) => {
        itemDrtIdentifier.modifiedDate = itemDrtIdentifier.modifiedDate != null ? moment(itemDrtIdentifier.modifiedDate) : null;
        itemDrtIdentifier.createdDate = itemDrtIdentifier.createdDate != null ? moment(itemDrtIdentifier.createdDate) : null;
      });
    }
    return res;
  }

  protected convertDateArrayFromServerTemp(res) {
    if (res.body) {
      res.body.forEach((itemDrtIdentifier: IItemDrtIdentifier) => {
        itemDrtIdentifier.modifiedDate = itemDrtIdentifier.modifiedDate != null ? moment(itemDrtIdentifier.modifiedDate) : null;
        itemDrtIdentifier.createdDate = itemDrtIdentifier.createdDate != null ? moment(itemDrtIdentifier.createdDate) : null;
      });
    }
    return res;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.modifiedDate = res.body.modifiedDate != null ? moment(res.body.modifiedDate) : null;
      res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
    }
    return res;
  }
}
