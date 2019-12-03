import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { JhiAlertService } from 'ng-jhipster';
import { IItemMaster, ItemMaster } from 'app/shared/model/product/item-master.model';
import { ItemMasterService } from 'app/shared/services/product/item-master.service';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ItemTypeService } from 'app/shared/services/product/item-type.service';
import { ItemStatusService } from 'app/shared/services/product/item-status.service';
import { ItemClassService } from 'app/shared/services/product/item-class.service';
import { StrengthService } from 'app/shared/services/product/strength.service';
import { RatingService } from 'app/shared/services/product/rating.service';
import { ItemFormTypeService } from 'app/shared/services/product/item-form-type.service';
import { UomService } from 'app/shared/services/product/uom.service';
import { IItemclass } from 'app/shared/model/product/itemclass.model';
import { IStrength } from 'app/shared/model/product/strength.model';
import { IRating } from 'app/shared/model/product/rating.model';
import { IItemformType } from 'app/shared/model/product/itemform-type.model';
import { IUom } from 'app/shared/model/ifp/uom.model';
import { IItemType } from 'app/shared/model/product/item-type.model';
import { IItemStatus } from 'app/shared/model/product/item-status.model';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { UdcService } from 'app/shared/services/product/udc.service';
import { IUdc } from 'app/shared/model/product/udc.model';
import { ICompanyMaster } from 'app/shared/model/companymaster/company-master.model';
import { CompanyMasterService } from 'app/shared/services/companymaster/company-master.service';
import { CustomValidators } from 'app/shared/util/custom.validators';

@Component({
  selector: 'jhi-item-information',
  templateUrl: './item-information.component.html',
  styleUrls: ['./item-information.component.scss']
})
export class ItemInformationComponent implements OnInit {
  @Output() nextTab = new EventEmitter();

  currentTab = '1';
  selectedManufacturerId;

  itemtypes: IItemType[];
  itemstatuses: IItemStatus[];
  itemclasses: IItemclass[];
  strengths: IStrength[];
  ratings: IRating[];
  itemformtypes: IItemformType[];
  uoms: IUom[];
  manufacturer: ICompanyMaster[];
  udcs: IUdc[];

  itemMaster: IItemMaster = new ItemMaster();

  itemInformationForm = this.fb.group({
    itemId: [{ value: null, disabled: true }],
    itemNo: [null, [Validators.required, Validators.maxLength(40)]],
    itemName: [null, [Validators.required, Validators.maxLength(240)]],
    itemDesc: [null, [Validators.maxLength(4000)]],
    itemTypeId: [null, Validators.required],
    statusId: [null, Validators.required],
    itemDateGroup: this.fb.group(
      {
        itemStartDate: [null, Validators.required],
        itemEndDate: []
      },
      { validators: CustomValidators.compareStartAndEnddate }
    ),
    strengthId: [],
    ratingId: [],
    formId: [],
    itemClassId: [],
    inventoryLocation: [],
    substitution: [null, Validators.required],
    lastLotExpiration: [],
    divestedDate: [],
    uomId: [null, Validators.required],
    uom2Id: [],
    packageSize: [null, Validators.required],
    additionalItemName: [null, [Validators.maxLength(240)]],
    additionalItemDesc: [null, [Validators.maxLength(500)]],
    itemCode: [null, [Validators.maxLength(50)]],
    lineExtension: [],
    // manufacturerNoId: [null, Validators.required],
    manufacturerNoId: [null],
    manufacturerNameId: [],
    address1: [{ value: null, disabled: true }],
    address2: [{ value: null, disabled: true }],
    city: [{ value: null, disabled: true }],
    state: [{ value: null, disabled: true }],
    zip: [{ value: null, disabled: true }],
    country: [{ value: null, disabled: true }],
    udc1: [],
    udc2: [],
    udc3: [],
    udc4: [],
    udc5: [],
    udc6: [],
    udc7: [],
    udc8: [],
    udc9: [],
    udc10: [],
    udc11: [],
    udc12: []
  });

  constructor(
    private fb: FormBuilder,
    protected jhiAlertService: JhiAlertService,
    protected itemMasterService: ItemMasterService,
    protected itemTypeService: ItemTypeService,
    protected itemStatusService: ItemStatusService,
    protected itemclassService: ItemClassService,
    protected strengthService: StrengthService,
    protected ratingService: RatingService,
    protected itemformTypeService: ItemFormTypeService,
    protected uomService: UomService,
    protected udcService: UdcService,
    protected companyMasterService: CompanyMasterService
  ) {}

  ngOnInit() {
    console.log('ItemInformationComponent::ngOnInit()');

    this.itemMaster = this.itemMasterService.getItemMaster();

    console.log(this.itemMaster);
    this.itemTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemType[]>) => response.body)
      )
      .subscribe((res: IItemType[]) => (this.itemtypes = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.itemStatusService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemStatus[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemStatus[]>) => response.body)
      )
      .subscribe((res: IItemStatus[]) => (this.itemstatuses = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.itemclassService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemclass[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemclass[]>) => response.body)
      )
      .subscribe((res: IItemclass[]) => (this.itemclasses = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.strengthService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStrength[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStrength[]>) => response.body)
      )
      .subscribe((res: IStrength[]) => (this.strengths = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.ratingService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRating[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRating[]>) => response.body)
      )
      .subscribe((res: IRating[]) => (this.ratings = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.itemformTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemformType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemformType[]>) => response.body)
      )
      .subscribe((res: IItemformType[]) => (this.itemformtypes = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.uomService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUom[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUom[]>) => response.body)
      )
      .subscribe((res: IUom[]) => (this.uoms = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.udcService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUdc[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUdc[]>) => response.body)
      )
      .subscribe((res: IUdc[]) => (this.udcs = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.companyMasterService.findCompanyAsManufacturer().subscribe(
      res => {
        this.manufacturer = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );

    if (this.itemMasterService.getMode() === 'view') {
      this.itemInformationForm.disable();
    }

    this.updateFormData();
  }

  onError(message: string): any {
    throw new Error('Method not implemented.');
  }

  next() {
    console.log('ItemInformationComponent::next()');

    this.nextTab.emit(this.currentTab);
  }

  savePartialData() {
    console.log('ItemInformationComponent::savePartialData()');

    if (
      this.itemInformationForm.get(['itemDateGroup']).errors !== null &&
      this.itemInformationForm.get(['itemDateGroup']).errors !== undefined
    ) {
      this.itemMasterService.setItemInformationDateIsValid(!this.itemInformationForm.get(['itemDateGroup']).errors.EndDateGreater);
    } else {
      this.itemMasterService.setItemInformationDateIsValid(true);
    }

    this.itemMasterService.setItemInformationFormIsValid(!this.itemInformationForm.invalid);
    this.saveFormData();
    console.log(this.itemMaster);
    this.itemMasterService.setItemMaster(this.itemMaster);
  }

  selectManufacturer() {
    console.log('AddItemComponent::selectManufacturer()' + this.selectedManufacturerId);
    this.manufacturer.forEach(data => {
      if (data.id === this.selectedManufacturerId) {
        this.itemInformationForm.get(['manufacturerNoId']).setValue(data.id);
        this.itemInformationForm.get(['manufacturerNameId']).setValue(data.id);
        this.itemInformationForm.get(['address1']).setValue(data.address1);
        this.itemInformationForm.get(['address2']).setValue(data.address2);
        this.itemInformationForm.get(['state']).setValue(data.stateId);
        this.itemInformationForm.get(['city']).setValue(data.city);
        this.itemInformationForm.get(['zip']).setValue(data.zip);
        this.itemInformationForm.get(['country']).setValue(data.countryId);
      }
    });
  }

  private saveFormData() {
    console.log('ItemInformationComponent::saveFormData()');

    let u1, u2, u3, u4, u5, u6, u7, u8, u9, u10, u11, u12;

    u1 = this.itemInformationForm.get(['udc1']).value != null ? this.itemInformationForm.get(['udc1']).value : '';
    u2 = this.itemInformationForm.get(['udc2']).value != null ? this.itemInformationForm.get(['udc2']).value : '';
    u3 = this.itemInformationForm.get(['udc3']).value != null ? this.itemInformationForm.get(['udc3']).value : '';
    u4 = this.itemInformationForm.get(['udc4']).value != null ? this.itemInformationForm.get(['udc4']).value : '';
    u5 = this.itemInformationForm.get(['udc5']).value != null ? this.itemInformationForm.get(['udc5']).value : '';
    u6 = this.itemInformationForm.get(['udc6']).value != null ? this.itemInformationForm.get(['udc6']).value : '';
    u7 = this.itemInformationForm.get(['udc7']).value != null ? this.itemInformationForm.get(['udc7']).value : '';
    u8 = this.itemInformationForm.get(['udc8']).value != null ? this.itemInformationForm.get(['udc8']).value : '';
    u9 = this.itemInformationForm.get(['udc9']).value != null ? this.itemInformationForm.get(['udc9']).value : '';
    u10 = this.itemInformationForm.get(['udc10']).value != null ? this.itemInformationForm.get(['udc10']).value : '';
    u11 = this.itemInformationForm.get(['udc11']).value != null ? this.itemInformationForm.get(['udc11']).value : '';
    u12 = this.itemInformationForm.get(['udc12']).value != null ? this.itemInformationForm.get(['udc12']).value : '';

    this.itemMaster.id = this.itemInformationForm.get(['itemId']).value;
    this.itemMaster.itemNo = this.itemInformationForm.get(['itemNo']).value;
    this.itemMaster.itemName = this.itemInformationForm.get(['itemName']).value;
    this.itemMaster.itemDesc = this.itemInformationForm.get(['itemDesc']).value;
    this.itemMaster.itemTypeId = this.itemInformationForm.get(['itemTypeId']).value;
    this.itemMaster.statusId = this.itemInformationForm.get(['statusId']).value;
    this.itemMaster.itemStartDate =
      this.itemInformationForm.value.itemDateGroup.itemStartDate !== null
        ? moment(this.itemInformationForm.value.itemDateGroup.itemStartDate, DATE_FORMAT)
        : undefined;
    this.itemMaster.itemEndDate =
      this.itemInformationForm.value.itemDateGroup.itemEndDate != null
        ? moment(this.itemInformationForm.value.itemDateGroup.itemEndDate, DATE_FORMAT)
        : undefined;
    this.itemMaster.strengthId = this.itemInformationForm.get(['strengthId']).value;
    this.itemMaster.ratingId = this.itemInformationForm.get(['ratingId']).value;
    this.itemMaster.formId = this.itemInformationForm.get(['formId']).value;
    this.itemMaster.itemClassId = this.itemInformationForm.get(['itemClassId']).value;
    this.itemMaster.inventoryLocation = this.itemInformationForm.get(['inventoryLocation']).value;
    this.itemMaster.substitution = this.itemInformationForm.get(['substitution']).value;
    this.itemMaster.lastLotExpiration =
      this.itemInformationForm.get(['lastLotExpiration']).value != null
        ? moment(this.itemInformationForm.get(['lastLotExpiration']).value, DATE_FORMAT)
        : undefined;
    this.itemMaster.divestedDate =
      this.itemInformationForm.get(['divestedDate']).value != null
        ? moment(this.itemInformationForm.get(['divestedDate']).value, DATE_FORMAT)
        : undefined;
    this.itemMaster.uomId = this.itemInformationForm.get(['uomId']).value;
    this.itemMaster.uom2Id = this.itemInformationForm.get(['uom2Id']).value;
    this.itemMaster.packageSize = this.itemInformationForm.get(['packageSize']).value;
    this.itemMaster.additionalItemName = this.itemInformationForm.get(['additionalItemName']).value;
    this.itemMaster.additionalItemDesc = this.itemInformationForm.get(['additionalItemDesc']).value;
    this.itemMaster.itemCode = this.itemInformationForm.get(['itemCode']).value;
    this.itemMaster.lineExtension = this.itemInformationForm.get(['lineExtension']).value;
    this.itemMaster.manufacturerNoId = this.itemInformationForm.get(['manufacturerNoId']).value;
    this.itemMaster.manufacturerNameId = this.itemInformationForm.get(['manufacturerNameId']).value;
    this.itemMaster.udcs =
      u1 + '|' + u2 + '|' + u3 + '|' + u4 + '|' + u5 + '|' + u6 + '|' + u7 + '|' + u8 + '|' + u9 + '|' + u10 + '|' + u11 + '|' + u12;
  }

  private updateFormData() {
    console.log('ItemInformationComponent::updateFormData()');

    if (this.itemMaster.udcs !== null && this.itemMaster.udcs !== undefined) {
      const udcArray = this.itemMaster.udcs.split('|');
      this.itemInformationForm.patchValue({
        udc1: udcArray[0] !== '' ? udcArray[0] : null,
        udc2: udcArray[1] !== '' ? udcArray[1] : null,
        udc3: udcArray[2] !== '' ? udcArray[2] : null,
        udc4: udcArray[3] !== '' ? udcArray[3] : null,
        udc5: udcArray[4] !== '' ? udcArray[4] : null,
        udc6: udcArray[5] !== '' ? udcArray[5] : null,
        udc7: udcArray[6] !== '' ? udcArray[6] : null,
        udc8: udcArray[7] !== '' ? udcArray[7] : null,
        udc9: udcArray[8] !== '' ? udcArray[8] : null,
        udc10: udcArray[9] !== '' ? udcArray[9] : null,
        udc11: udcArray[10] !== '' ? udcArray[10] : null,
        udc12: udcArray[11] !== '' ? udcArray[11] : null
      });
    }

    this.itemInformationForm.patchValue({
      itemId: this.itemMaster.id,
      itemNo: this.itemMaster.itemNo,
      itemName: this.itemMaster.itemName,
      itemDesc: this.itemMaster.itemDesc,
      packageSize: this.itemMaster.packageSize,
      statusId: this.itemMaster.statusId,
      inventoryLocation: this.itemMaster.inventoryLocation,
      itemDateGroup: {
        itemStartDate: this.itemMaster.itemStartDate != null ? this.itemMaster.itemStartDate.format(DATE_FORMAT) : null,
        itemEndDate: this.itemMaster.itemEndDate != null ? this.itemMaster.itemEndDate.format(DATE_FORMAT) : null
      },
      itemCode: this.itemMaster.itemCode,
      substitution: this.itemMaster.substitution,
      additionalItemName: this.itemMaster.additionalItemName,
      additionalItemDesc: this.itemMaster.additionalItemDesc,
      lastLotExpiration: this.itemMaster.lastLotExpiration != null ? this.itemMaster.lastLotExpiration.format(DATE_FORMAT) : null,
      lineExtension: this.itemMaster.lineExtension,
      divestedDate: this.itemMaster.divestedDate != null ? this.itemMaster.divestedDate.format(DATE_FORMAT) : null,
      itemTypeId: this.itemMaster.itemTypeId,
      itemClassId: this.itemMaster.itemClassId,
      strengthId: this.itemMaster.strengthId,
      ratingId: this.itemMaster.ratingId,
      formId: this.itemMaster.formId,
      uomId: this.itemMaster.uomId,
      uom2Id: this.itemMaster.uom2Id,
      labelercode: this.itemMaster.labelercode,
      manufacturerNoId: this.itemMaster.manufacturerNoId,
      manufacturerNameId: this.itemMaster.manufacturerNameId,
      udcs: this.itemMaster.udcs
    });
  }
}
