import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IItemPricingIdentifer } from 'app/shared/model/product/item-pricing-identifer.model';
import { map } from 'rxjs/operators';
import { createRequestOption } from 'app/shared/util/request-util';

type EntityResponseType = HttpResponse<IItemPricingIdentifer>;
type EntityArrayResponseType = HttpResponse<IItemPricingIdentifer[]>;
type EntityStringArrayResponseType = HttpResponse<string[]>;

@Injectable({
  providedIn: 'root'
})
export class ItemPricingIdentifierService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/item-pricing-identifers';
  public itemPricingIdentifierList: IItemPricingIdentifer[] = [];
  public deletedItemPricing: string[] = [];
  public pageLoadingForFirstTime: boolean;

  constructor(protected http: HttpClient) {}

  getPageLoadingForFirstTime() {
    return this.pageLoadingForFirstTime;
  }

  setPageLoadingForFirstTime(pageLoadingForFirstTime) {
    this.pageLoadingForFirstTime = pageLoadingForFirstTime;
  }

  getDeletedItemPricing() {
    return this.deletedItemPricing;
  }

  setDeletedItemPricing(deletedItemPricing) {
    this.deletedItemPricing = deletedItemPricing;
  }

  getItemPricingIdentifierList() {
    return this.itemPricingIdentifierList;
  }

  setItemPricingIdentifierList(itemPricingIdentifierList) {
    this.itemPricingIdentifierList = itemPricingIdentifierList;
  }

  // create(itemPricingIdentifer: IItemPricingIdentifer): Observable<EntityResponseType> {
  //   const copy = this.convertDateFromClient(itemPricingIdentifer);
  //   return this.http
  //     .post<IItemPricingIdentifer>(this.resourceUrl, copy, { observe: 'response' })
  //     .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  // }

  createArray(itemPricingIdentifer: IItemPricingIdentifer[]): Observable<EntityStringArrayResponseType> {
    let updatedData = [];
    updatedData = this.convertDateArrayFromClient(itemPricingIdentifer);
    return this.http
      .post<string[]>(this.resourceUrl, updatedData, { observe: 'response' })
      .pipe(map((res: EntityStringArrayResponseType) => res));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IItemPricingIdentifer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findArray(id?: any) {
    const options = createRequestOption(id);
    return this.http.get(this.resourceUrl + '/find-multiple', { params: options }).pipe(map(res => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  deleteArray(id?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(id);
    return this.http.delete<any>(this.resourceUrl + '/delete-multiple', { params: options, observe: 'response' });
  }

  // protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
  //   if (res.body) {
  //     res.body.forEach((itemPricingIdentifer: IItemPricingIdentifer) => {
  //       itemPricingIdentifer.startDate = itemPricingIdentifer.startDate != null ? moment(itemPricingIdentifer.startDate) : null;
  //       itemPricingIdentifer.endDate = itemPricingIdentifer.endDate != null ? moment(itemPricingIdentifer.endDate) : null;
  //       itemPricingIdentifer.createdDate = itemPricingIdentifer.createdDate != null ? moment(itemPricingIdentifer.createdDate) : null;
  //       itemPricingIdentifer.modifiedDate = itemPricingIdentifer.modifiedDate != null ? moment(itemPricingIdentifer.modifiedDate) : null;
  //     });
  //   }
  //   return res;
  // }

  protected convertDateArrayFromServer(res) {
    if (res) {
      res.forEach((itemPricingIdentifer: IItemPricingIdentifer) => {
        itemPricingIdentifer.startDate = itemPricingIdentifer.startDate != null ? moment(itemPricingIdentifer.startDate) : null;
        itemPricingIdentifer.endDate = itemPricingIdentifer.endDate != null ? moment(itemPricingIdentifer.endDate) : null;
        itemPricingIdentifer.createdDate = itemPricingIdentifer.createdDate != null ? moment(itemPricingIdentifer.createdDate) : null;
        itemPricingIdentifer.modifiedDate = itemPricingIdentifer.modifiedDate != null ? moment(itemPricingIdentifer.modifiedDate) : null;
      });
    }
    return res;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
      res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
      res.body.modifiedDate = res.body.modifiedDate != null ? moment(res.body.modifiedDate) : null;
    }
    return res;
  }

  protected convertDateFromClient(itemPricingIdentifer: IItemPricingIdentifer): IItemPricingIdentifer {
    const copy: IItemPricingIdentifer = Object.assign({}, itemPricingIdentifer, {
      startDate:
        itemPricingIdentifer.startDate != null && itemPricingIdentifer.startDate.isValid() ? itemPricingIdentifer.startDate.toJSON() : null,
      endDate:
        itemPricingIdentifer.endDate != null && itemPricingIdentifer.endDate.isValid() ? itemPricingIdentifer.endDate.toJSON() : null,
      createdDate:
        itemPricingIdentifer.createdDate != null && itemPricingIdentifer.createdDate.isValid()
          ? itemPricingIdentifer.createdDate.toJSON()
          : null,
      modifiedDate:
        itemPricingIdentifer.modifiedDate != null && itemPricingIdentifer.modifiedDate.isValid()
          ? itemPricingIdentifer.modifiedDate.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateArrayFromClient(itemPricingIdentifier: IItemPricingIdentifer[]): IItemPricingIdentifer[] {
    const data = [];
    itemPricingIdentifier.forEach(x => data.push(this.convertDateFromClient(x)));
    return data;
  }
}
