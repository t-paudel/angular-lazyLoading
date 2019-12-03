import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared';
import { map } from 'rxjs/operators';
import { IItemMstDistPrices, ItemMstDistPrices } from 'app/shared/model/product/item-mst-dist-prices.model';
import * as moment from 'moment';

type EntityResponseType = HttpResponse<IItemMstDistPrices>;
type EntityArrayResponseType = HttpResponse<IItemMstDistPrices[]>;

@Injectable({
  providedIn: 'root'
})
export class ItemMstDistPricesService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/item-mst-dist-prices';

  public conversionsList: ItemMstDistPrices[] = [];
  public deletedConversion: string[] = [];
  public pageLoadingForFirstTime: boolean;

  constructor(protected http: HttpClient) {}

  getPageLoadingForFirstTime() {
    return this.pageLoadingForFirstTime;
  }

  setPageLoadingForFirstTime(pageLoadingForFirstTime) {
    this.pageLoadingForFirstTime = pageLoadingForFirstTime;
  }

  getDeletedConversion() {
    return this.deletedConversion;
  }

  setDeletedConversion(deletedConversion) {
    this.deletedConversion = deletedConversion;
  }

  getConversionsList() {
    return this.conversionsList;
  }

  setConversionsList(conversionsList) {
    this.conversionsList = conversionsList;
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IItemMstDistPrices[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  create(itemMstDistPrices: IItemMstDistPrices): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemMstDistPrices);
    return this.http
      .post<IItemMstDistPrices>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  createArray(itemMstDistPrices: IItemMstDistPrices[]): Observable<EntityResponseType> {
    let updatedData = [];
    updatedData = this.convertDateArrayFromClient(itemMstDistPrices);

    return this.http
      .post<IItemMstDistPrices>(this.resourceUrl, updatedData, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findArray(id: string): Observable<EntityArrayResponseType> {
    return this.http
      .get<IItemMstDistPrices[]>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((itemMstDistPrices: IItemMstDistPrices) => {
        itemMstDistPrices.createdDate = itemMstDistPrices.createdDate != null ? moment(itemMstDistPrices.createdDate) : null;
        itemMstDistPrices.modifiedDate = itemMstDistPrices.modifiedDate != null ? moment(itemMstDistPrices.modifiedDate) : null;
      });
    }
    return res;
  }

  deleteArray(id: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(id);
    return this.http.delete<any>(this.resourceUrl + '/delete-multiple', { params: options, observe: 'response' });
  }

  protected convertDateFromClient(itemMstDistPrices: IItemMstDistPrices): IItemMstDistPrices {
    const copy: IItemMstDistPrices = Object.assign({}, itemMstDistPrices, {
      createdDate:
        itemMstDistPrices.createdDate != null && itemMstDistPrices.createdDate.isValid() ? itemMstDistPrices.createdDate.toJSON() : null,
      modifiedDate:
        itemMstDistPrices.modifiedDate != null && itemMstDistPrices.modifiedDate.isValid() ? itemMstDistPrices.modifiedDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
      res.body.modifiedDate = res.body.modifiedDate != null ? moment(res.body.modifiedDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromClient(itemMstDistPrices: IItemMstDistPrices[]): IItemMstDistPrices[] {
    const data = [];
    itemMstDistPrices.forEach(x => data.push(this.convertDateFromClient(x)));
    return data;
  }
}
