import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IIrtIndustryStandard, IrtIndustryStandard } from 'app/shared/model/product/irt-industry-standard.model';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { createRequestOption } from 'app/shared/util/request-util';

type EntityResponseType = HttpResponse<IIrtIndustryStandard>;
type EntityArrayResponseType = HttpResponse<IIrtIndustryStandard[]>;
type EntityStringArrayResponseType = HttpResponse<string[]>;

@Injectable({
  providedIn: 'root'
})
export class IrtIndustryStandardService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/irt-industry-standards';
  public irtIndustryStandardList: IIrtIndustryStandard[] = [];
  public deletedIdentifier: string[] = [];
  public pageLoadingForFirstTime: boolean;

  constructor(protected http: HttpClient) {}

  getPageLoadingForFirstTime() {
    return this.pageLoadingForFirstTime;
  }

  setPageLoadingForFirstTime(pageLoadingForFirstTime) {
    this.pageLoadingForFirstTime = pageLoadingForFirstTime;
  }

  getIrtIndustryStandardList() {
    return this.irtIndustryStandardList;
  }

  setIrtIndustryStandardList(irtIndustryStandardList) {
    this.irtIndustryStandardList = irtIndustryStandardList;
  }

  getDeletedIdentifier() {
    return this.deletedIdentifier;
  }

  setDeletedIdentifier(deletedIdentifier) {
    this.deletedIdentifier = deletedIdentifier;
  }

  // create(irtIndustryStandard: IIrtIndustryStandard): Observable<EntityResponseType> {
  //   const copy = this.convertDateFromClient(irtIndustryStandard);
  //   return this.http
  //     .post<IIrtIndustryStandard>(this.resourceUrl, copy, { observe: 'response' })
  //     .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  // }

  createArray(irtIndustryStandard: IIrtIndustryStandard[]): Observable<EntityStringArrayResponseType> {
    let updatedData = [];
    updatedData = this.convertDateArrayFromClient(irtIndustryStandard);
    return this.http
      .post<string[]>(this.resourceUrl, updatedData, { observe: 'response' })
      .pipe(map((res: EntityStringArrayResponseType) => res));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IIrtIndustryStandard>(`${this.resourceUrl}/${id}`, { observe: 'response' })
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

  protected convertDateFromClient(irtIndustryStandard: IIrtIndustryStandard): IIrtIndustryStandard {
    const copy: IIrtIndustryStandard = Object.assign({}, irtIndustryStandard, {
      endDate: irtIndustryStandard.endDate != null && irtIndustryStandard.endDate.isValid() ? irtIndustryStandard.endDate.toJSON() : null,
      startDate:
        irtIndustryStandard.startDate != null && irtIndustryStandard.startDate.isValid() ? irtIndustryStandard.startDate.toJSON() : null,
      modifiedDate:
        irtIndustryStandard.modifiedDate != null && irtIndustryStandard.modifiedDate.isValid()
          ? irtIndustryStandard.modifiedDate.toJSON()
          : null,
      createdDate:
        irtIndustryStandard.createdDate != null && irtIndustryStandard.createdDate.isValid()
          ? irtIndustryStandard.createdDate.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.modifiedDate = res.body.modifiedDate != null ? moment(res.body.modifiedDate) : null;
      res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res) {
    if (res) {
      res.forEach((irtIndustryStandard: IIrtIndustryStandard) => {
        irtIndustryStandard.endDate = irtIndustryStandard.endDate != null ? moment(irtIndustryStandard.endDate) : null;
        irtIndustryStandard.startDate = irtIndustryStandard.startDate != null ? moment(irtIndustryStandard.startDate) : null;
        irtIndustryStandard.modifiedDate = irtIndustryStandard.modifiedDate != null ? moment(irtIndustryStandard.modifiedDate) : null;
        irtIndustryStandard.createdDate = irtIndustryStandard.createdDate != null ? moment(irtIndustryStandard.createdDate) : null;
      });
    }
    return res;
  }

  protected convertDateArrayFromClient(irtIndustryStandard: IIrtIndustryStandard[]): IIrtIndustryStandard[] {
    const data = [];
    irtIndustryStandard.forEach(x => data.push(this.convertDateFromClient(x)));
    return data;
  }
}
