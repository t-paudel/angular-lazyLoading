import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IItemPricingIdentifer, ItemPricingIdentifer } from 'app/shared/model/product/item-pricing-identifer.model';
import { Validators, FormBuilder } from '@angular/forms';
import { ItemMasterService } from 'app/shared/services/product/item-master.service';
import { ItemPricingQualifierService } from 'app/shared/services/product/item-pricing-qualifier.service';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IItemPricingQualifier } from 'app/shared/model/product/item-pricing-qualifier.model';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ItemPricingIdentifierService } from 'app/shared/services/product/item-pricing-identifier.service';
import { ItemMaster, IItemMaster } from 'app/shared/model/product/item-master.model';
import { CustomValidators } from 'app/shared/util/custom.validators';

@Component({
  selector: 'jhi-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  @Output() nextTab = new EventEmitter();
  @Output() previousTab = new EventEmitter();

  currentTab = '3';
  hoveredRow = -1;
  selectedRow = -1;
  deleteButtonDisabled = true;
  disableComponents = false;

  headerRow = ['Price Qualifier Name', 'Price', 'Start_Date', 'End_Date'];

  itemMaster: IItemMaster = new ItemMaster();
  itemPricingQualifier: IItemPricingQualifier[];
  deletedItemPricing: string[];
  itemPricingQualifierList: IItemPricingQualifier[] = [];
  displayDataForPricingArray: IItemPricingIdentifer[] = [];
  displayDataForPricing: IItemPricingIdentifer;

  pricingForm = this.fb.group({
    priceQualifierName: [null, [Validators.required, Validators.maxLength(50)]],
    itemPrice: [],
    itemPriceDateGroup: this.fb.group(
      {
        itemPriceStartDate: [],
        itemPriceEndDate: []
      },
      { validators: CustomValidators.compareStartAndEnddate }
    )
  });

  constructor(
    private fb: FormBuilder,
    protected itemMasterService: ItemMasterService,
    protected itemPricingQualifierService: ItemPricingQualifierService,
    protected itemPricingIdentifierService: ItemPricingIdentifierService
  ) {}

  ngOnInit() {
    console.log('PricingComponent::ngOnInit()');

    this.itemPricingQualifierService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemPricingQualifier[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemPricingQualifier[]>) => response.body)
      )
      .subscribe(
        (res: IItemPricingQualifier[]) => (this.itemPricingQualifier = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    if (this.itemMasterService.getMode() === 'edit' || this.itemMasterService.getMode() === 'view') {
      if (this.itemPricingIdentifierService.getPageLoadingForFirstTime()) {
        console.log('edit or view mode');
        this.loadDataForUpdate();
      }
    }

    if (this.itemMasterService.getMode() === 'view') {
      this.disableComponents = true;
      this.pricingForm.disable();
    }

    this.itemMasterService.setTouchedPricingTab(true);
    this.updateFormData();

    if (this.displayDataForPricingArray.length === 0) {
      this.deleteButtonDisabled = true;
    } else {
      this.deleteButtonDisabled = false;
    }
  }

  onError(message: string): any {
    throw new Error('Method not implemented.');
  }

  addRow() {
    console.log('AddItemComponent::addRow()');

    if (this.pricingForm.get(['priceQualifierName']).value === null) {
      alert('Please enter Pricing Qualifier Name!!');
      return;
    }

    if (this.pricingForm.get(['itemPriceDateGroup']).errors !== null) {
      if (this.pricingForm.get(['itemPriceDateGroup']).errors.EndDateGreater) {
        alert('End Date cannot be smaller than Start Date!!');
        return;
      }
    }

    this.displayDataForPricing = new ItemPricingIdentifer();

    let itemPriceQualifierId, itemPriceQualifierName;
    const createdDate = new Date();

    for (let i = 0; i < this.itemPricingQualifier.length; i++) {
      if (this.itemPricingQualifier[i].id === this.pricingForm.get(['priceQualifierName']).value) {
        itemPriceQualifierId = this.itemPricingQualifier[i].id;
        itemPriceQualifierName = this.itemPricingQualifier[i].priceQualifierName;
        break;
      }
    }

    this.displayDataForPricing.itemPriceQualifierId = itemPriceQualifierId;
    this.displayDataForPricing.priceQualifierName = itemPriceQualifierName;
    this.displayDataForPricing.itemPrice = this.pricingForm.get(['itemPrice']).value;
    this.displayDataForPricing.startDate =
      this.pricingForm.value.itemPriceDateGroup.identifierStartDate !== null
        ? moment(this.pricingForm.value.itemPriceDateGroup.itemPriceStartDate, DATE_FORMAT)
        : undefined;
    this.displayDataForPricing.endDate =
      this.pricingForm.value.itemPriceDateGroup.identifierEndDate !== null
        ? moment(this.pricingForm.value.itemPriceDateGroup.itemPriceEndDate, DATE_FORMAT)
        : undefined;
    this.displayDataForPricing.createdDate = createdDate !== null ? moment(createdDate, DATE_FORMAT) : undefined;
    this.displayDataForPricing.modifiedDate = createdDate !== null ? moment(createdDate, DATE_FORMAT) : undefined;

    this.displayDataForPricingArray.push(this.displayDataForPricing);
    this.deleteButtonDisabled = false;
    this.pricingForm.reset();
  }

  deleteRow() {
    console.log('AddItemComponent::deleteRow()');

    if (this.selectedRow === -1) {
      alert('Please select a row to delete!!');
      return;
    }

    for (let i = 0; i < this.displayDataForPricingArray.length; i++) {
      if (i === this.selectedRow) {
        if (this.displayDataForPricingArray[i].id !== null && this.displayDataForPricingArray[i].id !== undefined) {
          this.deletedItemPricing.push(this.displayDataForPricingArray[i].id);
        }
        this.displayDataForPricingArray.splice(i, 1);
      }
    }

    if (this.displayDataForPricingArray.length === 0) {
      this.deleteButtonDisabled = true;
    }

    this.selectedRow = -1;
  }

  savePartialData() {
    console.log('PricingComponent::savePartialData()');

    console.log('price length -> ' + this.displayDataForPricingArray.length);
    this.itemPricingIdentifierService.setItemPricingIdentifierList(this.displayDataForPricingArray);
    console.log('price length after setting -> ' + this.itemPricingIdentifierService.getItemPricingIdentifierList().length);
    this.itemPricingIdentifierService.setDeletedItemPricing(this.deletedItemPricing);
  }

  updateFormData() {
    console.log('PricingComponent::updateFormData()');

    this.displayDataForPricingArray = this.itemPricingIdentifierService.getItemPricingIdentifierList();
    console.log('price length -> ' + this.itemPricingIdentifierService.getItemPricingIdentifierList().length);
    this.deletedItemPricing = this.itemPricingIdentifierService.getDeletedItemPricing();
  }

  loadDataForUpdate() {
    console.log('PricingComponent::loadDataForUpdate()');

    this.itemMaster = this.itemMasterService.getItemMaster();
    const pricingId = this.itemMaster.itemPricingIdentifierId;
    const priceQualifierIdList: string[] = [];

    if (pricingId != null) {
      new Promise(resolve => {
        this.itemPricingIdentifierService.findArray({ id: pricingId }).subscribe((data: IItemPricingIdentifer[]) => {
          this.displayDataForPricingArray = data;

          data.forEach(ipq => priceQualifierIdList.push(ipq.itemPriceQualifierId));

          this.itemPricingQualifierService.findArray({ id: priceQualifierIdList }).subscribe((result: IItemPricingQualifier[]) => {
            this.itemPricingQualifierList = result;
            resolve(result);
          });
        });
      }).then(() => {
        this.displayDataForPricingArray.forEach(data => {
          this.setItemPricingQualifierName(data);
        });
      });
    }

    this.itemPricingIdentifierService.setItemPricingIdentifierList(this.displayDataForPricingArray);
  }

  setItemPricingQualifierName(data: IItemPricingIdentifer) {
    this.itemPricingQualifierList.forEach(qualifier => {
      if (qualifier.id === data.itemPriceQualifierId) {
        data.priceQualifierName = qualifier.priceQualifierName;
      }
    });
  }

  next() {
    console.log('PricingComponent::next()');

    this.nextTab.emit(this.currentTab);
  }

  previous() {
    console.log('PricingComponent::previous()');

    this.previousTab.emit(this.currentTab);
  }

  onHover(i) {
    this.hoveredRow = i;
  }

  onDehover() {
    this.hoveredRow = -1;
  }

  onSelect(i) {
    this.selectedRow = i;
  }

  onDeselect() {
    this.selectedRow = -1;
  }
}
