import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { IItemMaster, ItemMaster } from 'app/shared/model/product/item-master.model';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { createRequestOption } from 'app/shared';
import { SearchCriteria } from 'app/shared/model/product/searchcriteria.model';

type EntityResponseType = HttpResponse<IItemMaster>;
type EntityArrayResponseType = HttpResponse<IItemMaster[]>;

@Injectable({
  providedIn: 'root'
})
export class ItemMasterService {
  public resourceUrl = SERVER_API_URL + 'services/product/api/item-masters';

  public mode: string;
  public itemId: string;
  public itemMaster: IItemMaster = new ItemMaster();
  public touchedIdentifierTab: boolean;
  public touchedPricingTab: boolean;
  public touchedConversionTab: boolean;
  public itemInformationFormIsValid: boolean;
  public itemInformationDateIsValid: boolean;
  public additionalInfoFormIsValid: boolean;

  public headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(protected http: HttpClient) {}

  getItemInformationDateIsValid() {
    return this.itemInformationDateIsValid;
  }

  setItemInformationDateIsValid(itemInformationDateIsValid) {
    this.itemInformationDateIsValid = itemInformationDateIsValid;
  }

  getAdditionalInfoFormIsValid() {
    return this.additionalInfoFormIsValid;
  }

  setAdditionalInfoFormIsValid(additionalInfoFormIsValid) {
    this.additionalInfoFormIsValid = additionalInfoFormIsValid;
  }

  getItemInformationFormIsValid() {
    return this.itemInformationFormIsValid;
  }

  setItemInformationFormIsValid(itemInformationFormIsValid) {
    this.itemInformationFormIsValid = itemInformationFormIsValid;
  }

  getTouchedIdentifierTab() {
    return this.touchedIdentifierTab;
  }

  setTouchedIdentifierTab(touchedIdentifierTab) {
    this.touchedIdentifierTab = touchedIdentifierTab;
  }

  getTouchedPricingTab() {
    return this.touchedPricingTab;
  }

  setTouchedPricingTab(touchedPricingTab) {
    this.touchedPricingTab = touchedPricingTab;
  }

  getTouchedConversionTab() {
    return this.touchedConversionTab;
  }

  setTouchedConversionTab(touchedConversionTab) {
    this.touchedConversionTab = touchedConversionTab;
  }

  setMode(mode) {
    this.mode = mode;
  }

  getMode() {
    return this.mode;
  }

  setItemId(id) {
    this.itemId = id;
  }

  getItemId() {
    return this.itemId;
  }

  setItemMaster(itemMaster: IItemMaster) {
    this.itemMaster = itemMaster;
  }

  getItemMaster() {
    return this.itemMaster;
  }

  create(itemMaster: IItemMaster): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemMaster);
    return this.http
      .post<IItemMaster>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IItemMaster[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IItemMaster>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(itemMaster: IItemMaster): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemMaster);
    return this.http
      .put<IItemMaster>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSearchResults(searchCriteria: SearchCriteria[]): Observable<EntityArrayResponseType> {
    console.log('Url---->' + this.resourceUrl + '/searchResults');
    return this.http
      .post<IItemMaster[]>(this.resourceUrl + '/searchResults', searchCriteria, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  findItem(id: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get<IItemMaster>(`${this.resourceUrl}/${id}`, { observe: 'response' })
        .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
        .subscribe(data => {
          resolve(data.body);
        });
    });
  }

  getItemMasters(req?: any): Observable<IItemMaster[]> {
    const options = createRequestOption(req);
    return this.http.get<any>(this.resourceUrl + '/bulk', { params: options });
  }

  protected convertDateFromClient(itemMaster: IItemMaster): IItemMaster {
    const copy: IItemMaster = Object.assign({}, itemMaster, {
      itemStartDate: itemMaster.itemStartDate != null && itemMaster.itemStartDate.isValid() ? itemMaster.itemStartDate.toJSON() : null,
      itemEndDate: itemMaster.itemEndDate != null && itemMaster.itemEndDate.isValid() ? itemMaster.itemEndDate.toJSON() : null,
      clottingfactorEnddate:
        itemMaster.clottingfactorEnddate != null && itemMaster.clottingfactorEnddate.isValid()
          ? itemMaster.clottingfactorEnddate.toJSON()
          : null,
      clottingfactorStartdate:
        itemMaster.clottingfactorStartdate != null && itemMaster.clottingfactorStartdate.isValid()
          ? itemMaster.clottingfactorStartdate.toJSON()
          : null,
      newformulationEnddate:
        itemMaster.newformulationEnddate != null && itemMaster.newformulationEnddate.isValid()
          ? itemMaster.newformulationEnddate.toJSON()
          : null,
      newformulationStartdate:
        itemMaster.newformulationStartdate != null && itemMaster.newformulationStartdate.isValid()
          ? itemMaster.newformulationStartdate.toJSON()
          : null,
      packagesizeIntrodate:
        itemMaster.packagesizeIntrodate != null && itemMaster.packagesizeIntrodate.isValid()
          ? itemMaster.packagesizeIntrodate.toJSON()
          : null,
      pediatricexclusiveEnddate:
        itemMaster.pediatricexclusiveEnddate != null && itemMaster.pediatricexclusiveEnddate.isValid()
          ? itemMaster.pediatricexclusiveEnddate.toJSON()
          : null,
      pediatricexclusiveStartdate:
        itemMaster.pediatricexclusiveStartdate != null && itemMaster.pediatricexclusiveStartdate.isValid()
          ? itemMaster.pediatricexclusiveStartdate.toJSON()
          : null,
      lastLotExpiration:
        itemMaster.lastLotExpiration != null && itemMaster.lastLotExpiration.isValid() ? itemMaster.lastLotExpiration.toJSON() : null,
      divestedDate: itemMaster.divestedDate != null && itemMaster.divestedDate.isValid() ? itemMaster.divestedDate.toJSON() : null,
      brandInformationStartdate:
        itemMaster.brandInformationStartdate != null && itemMaster.brandInformationStartdate.isValid()
          ? itemMaster.brandInformationStartdate.toJSON()
          : null,
      brandInformationEnddate:
        itemMaster.brandInformationEnddate != null && itemMaster.brandInformationEnddate.isValid()
          ? itemMaster.brandInformationEnddate.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.itemStartDate = res.body.itemStartDate != null ? moment(res.body.itemStartDate) : null;
      res.body.itemEndDate = res.body.itemEndDate != null ? moment(res.body.itemEndDate) : null;
      res.body.clottingfactorEnddate = res.body.clottingfactorEnddate != null ? moment(res.body.clottingfactorEnddate) : null;
      res.body.clottingfactorStartdate = res.body.clottingfactorStartdate != null ? moment(res.body.clottingfactorStartdate) : null;
      res.body.newformulationEnddate = res.body.newformulationEnddate != null ? moment(res.body.newformulationEnddate) : null;
      res.body.newformulationStartdate = res.body.newformulationStartdate != null ? moment(res.body.newformulationStartdate) : null;
      res.body.packagesizeIntrodate = res.body.packagesizeIntrodate != null ? moment(res.body.packagesizeIntrodate) : null;
      res.body.pediatricexclusiveEnddate = res.body.pediatricexclusiveEnddate != null ? moment(res.body.pediatricexclusiveEnddate) : null;
      res.body.pediatricexclusiveStartdate =
        res.body.pediatricexclusiveStartdate != null ? moment(res.body.pediatricexclusiveStartdate) : null;
      res.body.lastLotExpiration = res.body.lastLotExpiration != null ? moment(res.body.lastLotExpiration) : null;
      res.body.divestedDate = res.body.divestedDate != null ? moment(res.body.divestedDate) : null;
      res.body.brandInformationStartdate = res.body.brandInformationStartdate != null ? moment(res.body.brandInformationStartdate) : null;
      res.body.brandInformationEnddate = res.body.brandInformationEnddate != null ? moment(res.body.brandInformationEnddate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((itemMaster: IItemMaster) => {
        itemMaster.itemStartDate = itemMaster.itemStartDate != null ? moment(itemMaster.itemStartDate) : null;
        itemMaster.itemEndDate = itemMaster.itemEndDate != null ? moment(itemMaster.itemEndDate) : null;
        itemMaster.clottingfactorEnddate = itemMaster.clottingfactorEnddate != null ? moment(itemMaster.clottingfactorEnddate) : null;
        itemMaster.clottingfactorStartdate = itemMaster.clottingfactorStartdate != null ? moment(itemMaster.clottingfactorStartdate) : null;
        itemMaster.newformulationEnddate = itemMaster.newformulationEnddate != null ? moment(itemMaster.newformulationEnddate) : null;
        itemMaster.newformulationStartdate = itemMaster.newformulationStartdate != null ? moment(itemMaster.newformulationStartdate) : null;
        itemMaster.packagesizeIntrodate = itemMaster.packagesizeIntrodate != null ? moment(itemMaster.packagesizeIntrodate) : null;
        itemMaster.pediatricexclusiveEnddate =
          itemMaster.pediatricexclusiveEnddate != null ? moment(itemMaster.pediatricexclusiveEnddate) : null;
        itemMaster.pediatricexclusiveStartdate =
          itemMaster.pediatricexclusiveStartdate != null ? moment(itemMaster.pediatricexclusiveStartdate) : null;
        itemMaster.lastLotExpiration = itemMaster.lastLotExpiration != null ? moment(itemMaster.lastLotExpiration) : null;
        itemMaster.divestedDate = itemMaster.divestedDate != null ? moment(itemMaster.divestedDate) : null;
        itemMaster.brandInformationStartdate =
          itemMaster.brandInformationStartdate != null ? moment(itemMaster.brandInformationStartdate) : null;
        itemMaster.brandInformationEnddate = itemMaster.brandInformationEnddate != null ? moment(itemMaster.brandInformationEnddate) : null;
      });
    }
    return res;
  }
}
