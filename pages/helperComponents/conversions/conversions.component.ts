import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IItemMstDistPrices, ItemMstDistPrices } from 'app/shared/model/product/item-mst-dist-prices.model';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import * as moment from 'moment';
import { IUom } from 'app/shared/model/product/uom.model';
import { UomService } from 'app/shared/services/product/uom.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { ItemMstDistPricesService } from 'app/shared/services/product/item-mst-dist-prices.service';
import { ItemMaster, IItemMaster } from 'app/shared/model/product/item-master.model';
import { ItemMasterService } from 'app/shared/services/product/item-master.service';

@Component({
  selector: 'jhi-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.scss']
})
export class ConversionsComponent implements OnInit {
  @Output() nextTab = new EventEmitter();
  @Output() previousTab = new EventEmitter();

  currentTab = '3';
  hoveredRow = -1;
  selectedRow = -1;
  disableComponents = false;

  itemMaster: IItemMaster = new ItemMaster();
  displayDataForConversionArray: IItemMstDistPrices[];
  displayDataForConversion: IItemMstDistPrices;
  uoms: IUom[];
  deletedConversion: string[];

  conversionsForm = this.fb.group({
    distId: [null],
    uomProfile: [null]
  });

  constructor(
    private fb: FormBuilder,
    protected uomService: UomService,
    protected itemMasterService: ItemMasterService,
    protected itemMstDistPricesServices: ItemMstDistPricesService
  ) {}

  ngOnInit() {
    console.log('ConversionsComponent::ngOnInit()');

    this.uomService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUom[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUom[]>) => response.body)
      )
      .subscribe((res: IUom[]) => (this.uoms = res), (res: HttpErrorResponse) => this.onError(res.message));

    if (this.itemMasterService.getMode() === 'edit' || this.itemMasterService.getMode() === 'view') {
      if (this.itemMstDistPricesServices.getPageLoadingForFirstTime()) {
        console.log('edit or view mode');
        this.loadDataForUpdate();
      }
    }

    if (this.itemMasterService.getMode() === 'view') {
      this.disableComponents = true;
      this.conversionsForm.disable();
    }

    this.itemMasterService.setTouchedConversionTab(true);
    this.updateFormData();
  }

  onError(message: string): any {
    throw new Error('Method not implemented.');
  }

  addRow() {
    console.log('ConversionsComponent::addRow()');

    if (this.conversionsForm.get(['distId']).value === null && this.conversionsForm.get(['uomProfile']).value === null) {
      alert('Please enter value before adding!!');
      return;
    }

    const createdDate = new Date();
    this.displayDataForConversion = new ItemMstDistPrices();

    const uomData = this.conversionsForm.get(['uomProfile']).value;

    for (let i = 0; i < this.uoms.length; i++) {
      if (this.uoms[i].id === uomData) {
        this.displayDataForConversion.uomProfileName = this.uoms[i].description;
        break;
      }
    }

    this.displayDataForConversion.distId = this.conversionsForm.get(['distId']).value;
    this.displayDataForConversion.uomProfile = this.conversionsForm.get(['uomProfile']).value;
    this.displayDataForConversion.createdDate = createdDate !== null ? moment(createdDate, DATE_FORMAT) : undefined;
    this.displayDataForConversion.modifiedDate = createdDate !== null ? moment(createdDate, DATE_FORMAT) : undefined;
    this.displayDataForConversion.distName = this.conversionsForm.get(['distId']).value;

    this.displayDataForConversionArray.push(this.displayDataForConversion);

    this.conversionsForm.reset();
  }

  deleteRow() {
    console.log('ConversionsComponent::deleteRow()');

    if (this.selectedRow === -1) {
      alert('Please select a row to delete!!');
      return;
    }

    if (this.selectedRow !== -1) {
      for (let i = 0; i < this.displayDataForConversionArray.length; i++) {
        if (i === this.selectedRow) {
          if (this.displayDataForConversionArray[i].id !== null && this.displayDataForConversionArray[i].id !== undefined) {
            this.deletedConversion.push(this.displayDataForConversionArray[i].id);
          }
          this.displayDataForConversionArray.splice(i, 1);
        }
        break;
      }
    }

    console.log(this.deletedConversion);
    this.selectedRow = -1;
  }

  savePartialData() {
    console.log('ConversionsComponent::savePartialData()');

    this.itemMstDistPricesServices.setConversionsList(this.displayDataForConversionArray);
    this.itemMstDistPricesServices.setDeletedConversion(this.deletedConversion);
  }

  loadDataForUpdate() {
    console.log('ConversionsComponent::loadDataForUpdate()');

    this.itemMaster = this.itemMasterService.getItemMaster();

    new Promise(resolve => {
      this.itemMstDistPricesServices.findArray(this.itemMaster.id).subscribe(data => {
        this.displayDataForConversionArray = data.body;
        console.log(data.body);
        resolve(data);
      });
    }).then(() => {
      this.displayDataForConversionArray.forEach(data => {
        this.setUomProfileName(data);
      });
    });

    this.itemMstDistPricesServices.setConversionsList(this.displayDataForConversionArray);
  }

  updateFormData() {
    console.log('ConversionsComponent::updateFormData()');

    this.displayDataForConversionArray = this.itemMstDistPricesServices.getConversionsList();
    this.deletedConversion = this.itemMstDistPricesServices.getDeletedConversion();
    console.log(this.itemMstDistPricesServices.getConversionsList());
  }

  setUomProfileName(data: IItemMstDistPrices) {
    this.uoms.forEach(uom => {
      if (uom.id === data.uomProfile) {
        data.uomProfileName = uom.description;
      }
    });
  }

  next() {
    console.log('ConversionsComponent::next()');

    this.nextTab.emit(this.currentTab);
  }

  previous() {
    console.log('ConversionsComponent::previous()');

    this.previousTab.emit(this.currentTab);
  }

  onHover(i) {
    // console.log('IdentifiersComponent::onHover()');
    this.hoveredRow = i;
  }

  onDehover() {
    // console.log('IdentifiersComponent::onDehover()');
    this.hoveredRow = -1;
  }

  onSelect(i) {
    // console.log('IdentifiersComponent::onSelect()');
    this.selectedRow = i;
  }

  onDeselect() {
    // console.log('IdentifiersComponent::onDeselect()');
    this.selectedRow = -1;
  }
}
