import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { ICompanyMaster } from 'app/shared/model/product/company-master.model';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

type EntityResponseType = HttpResponse<ICompanyMaster>;
type EntityArrayResponseType = HttpResponse<ICompanyMaster[]>;

@Injectable({
  providedIn: 'root'
})
export class CompanyMasterService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/company-masters';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICompanyMaster[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((companyMaster: ICompanyMaster) => {
        companyMaster.deaExpirationDate = companyMaster.deaExpirationDate != null ? moment(companyMaster.deaExpirationDate) : null;
        companyMaster.dateAcctOpened = companyMaster.dateAcctOpened != null ? moment(companyMaster.dateAcctOpened) : null;
        companyMaster.dateAcctClosed = companyMaster.dateAcctClosed != null ? moment(companyMaster.dateAcctClosed) : null;
        companyMaster.lastModifiedExternal = companyMaster.lastModifiedExternal != null ? moment(companyMaster.lastModifiedExternal) : null;
        companyMaster.tradeClassStartDate = companyMaster.tradeClassStartDate != null ? moment(companyMaster.tradeClassStartDate) : null;
        companyMaster.tradeClassEndDate = companyMaster.tradeClassEndDate != null ? moment(companyMaster.tradeClassEndDate) : null;
        companyMaster.lastUpdatedDate = companyMaster.lastUpdatedDate != null ? moment(companyMaster.lastUpdatedDate) : null;
        companyMaster.createdDate = companyMaster.createdDate != null ? moment(companyMaster.createdDate) : null;
        companyMaster.modifiedDate = companyMaster.modifiedDate != null ? moment(companyMaster.modifiedDate) : null;
      });
    }
    return res;
  }
}
