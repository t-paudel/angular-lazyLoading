import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IItemMaster, ItemMaster } from 'app/shared/model/product/item-master.model';
import { ItemMasterService } from 'app/shared/services/product/item-master.service';
import { ItemPricingIdentifierService } from 'app/shared/services/product/item-pricing-identifier.service';
import { IrtIndustryStandardService } from 'app/shared/services/product/irt-industry-standard.service';
import { ItemMstDistPricesService } from 'app/shared/services/product/item-mst-dist-prices.service';
import { IItemPricingIdentifer } from 'app/shared/model/product/item-pricing-identifer.model';
import { IIrtIndustryStandard } from 'app/shared/model/product/irt-industry-standard.model';
import { IItemMstDistPrices } from 'app/shared/model/product/item-mst-dist-prices.model';

@Component({
  selector: 'jhi-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Output() saveData = new EventEmitter();
  @Output() previousTab = new EventEmitter();

  currentTab = '6';
  internalNotes = '';
  tempNotes = '';
  disableComponents = false;

  deletedItemPricing: string[];
  deletedIdentifier: string[];
  deletedConversion: string[];
  itemPricingIdentifierList: IItemPricingIdentifer[];
  irtIndustryStandardList: IIrtIndustryStandard[];
  conversionsList: IItemMstDistPrices[];
  savedIrtIndustryObjectIdList: string[];
  savedPricingObjectIdList: string[];
  savedItemMasterId: string;

  itemMaster: IItemMaster;

  notesForm = this.fb.group({
    internalNotes: [{ value: null, disabled: true }],
    notes: [null, [Validators.maxLength(1000)]]
  });

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    protected itemMasterService: ItemMasterService,
    protected itemPricingIdentifierService: ItemPricingIdentifierService,
    protected irtIndustryStandardService: IrtIndustryStandardService,
    protected itemMstDistPricesServices: ItemMstDistPricesService
  ) {}

  ngOnInit() {
    console.log('NotesComponent::ngOnInit()');

    this.deletedItemPricing = this.itemPricingIdentifierService.getDeletedItemPricing();
    this.deletedIdentifier = this.irtIndustryStandardService.getDeletedIdentifier();
    this.deletedConversion = this.itemMstDistPricesServices.getDeletedConversion();
    this.itemPricingIdentifierList = this.itemPricingIdentifierService.getItemPricingIdentifierList();
    this.irtIndustryStandardList = this.irtIndustryStandardService.getIrtIndustryStandardList();
    this.conversionsList = this.itemMstDistPricesServices.getConversionsList();

    if (this.itemMasterService.getMode() === 'view') {
      this.notesForm.disable();
      this.disableComponents = true;
    }

    this.updateFormData();
  }

  updateNotes() {
    console.log('NotesComponent::updateNotes()');

    this.internalNotes =
      '<' + this.datePipe.transform(new Date(), 'medium') + '>\t' + this.notesForm.get(['notes']).value + '\n' + this.internalNotes;
    this.notesForm.controls['notes'].reset();
    this.notesForm.controls['internalNotes'].setValue(this.internalNotes);
  }

  savePartialData() {
    console.log('NotesComponent::savePartialData()');

    this.itemMaster = new ItemMaster();
    this.itemMaster = this.itemMasterService.getItemMaster();
    this.saveFormData();
    this.itemMasterService.setItemMaster(this.itemMaster);
    console.log(this.itemMaster);
  }

  save() {
    console.log('NotesComponent::save()');

    if (!this.itemMasterService.getItemInformationDateIsValid()) {
      alert('Item Information :- End Date cannot be smaller than Start Date!!');
      return;
    }

    if (!this.itemMasterService.getItemInformationFormIsValid()) {
      alert('Item Information :- Please enter required fields!!');
      return;
    }

    if (!this.itemMasterService.getAdditionalInfoFormIsValid()) {
      alert('Additional Information :- End Date cannot be smaller than Start Date!!');
      return;
    }

    this.savePartialData();

    const item: IItemMaster = this.itemMasterService.getItemMaster();

    console.log('industry list');
    console.log(this.irtIndustryStandardList);
    console.log('item price list');
    console.log(this.itemPricingIdentifierList);
    console.log('conversion list');
    console.log(this.conversionsList);

    console.log('deletedConversion');
    console.log(this.deletedConversion);
    console.log('deletedIdentifier');
    console.log(this.deletedIdentifier);
    console.log('deletedItemPricing');
    console.log(this.deletedItemPricing);

    if (this.deletedIdentifier !== null) {
      this.irtIndustryStandardService.deleteArray({ id: this.deletedIdentifier }).subscribe();
    }

    if (this.deletedItemPricing !== null) {
      this.itemPricingIdentifierService.deleteArray({ id: this.deletedItemPricing }).subscribe();
    }

    if (this.deletedConversion !== null) {
      this.itemMstDistPricesServices.deleteArray({ id: this.deletedConversion }).subscribe();
    }

    new Promise(resolve => {
      this.irtIndustryStandardService.createArray(this.irtIndustryStandardList).subscribe(res => {
        this.savedIrtIndustryObjectIdList = res.body;
        resolve(res.body);
      });
    }).then(() => {
      new Promise(resolve => {
        this.itemPricingIdentifierService.createArray(this.itemPricingIdentifierList).subscribe(res => {
          this.savedPricingObjectIdList = res.body;
          resolve(res.body);
        });
      }).then(() => {
        if (this.itemMasterService.getTouchedIdentifierTab()) {
          item.irtIndustryStandardId = this.savedIrtIndustryObjectIdList;
        }

        if (this.itemMasterService.getTouchedPricingTab()) {
          item.itemPricingIdentifierId = this.savedPricingObjectIdList;
        }
        console.log('item id = ' + item.id);
        if (item.id !== undefined) {
          console.log('updating');
          new Promise(resolve => {
            this.itemMasterService.update(item).subscribe(data => {
              this.savedItemMasterId = data.body.id;
              resolve(data);
            });
          }).then(() => {
            if (this.itemMasterService.getTouchedConversionTab()) {
              this.conversionsList.forEach(data => {
                data.itemId = this.savedItemMasterId;
              });
              this.itemMstDistPricesServices.createArray(this.conversionsList).subscribe();
            }
          });
        } else {
          console.log('creating');
          new Promise(resolve => {
            this.itemMasterService.create(item).subscribe(data => {
              this.savedItemMasterId = data.body.id;
              console.log('itemMasterid = ' + this.savedItemMasterId);
              resolve(data);
            });
          }).then(() => {
            if (this.itemMasterService.getTouchedConversionTab()) {
              this.conversionsList.forEach(data => {
                data.itemId = this.savedItemMasterId;
              });
              this.itemMstDistPricesServices.createArray(this.conversionsList).subscribe();
            }
          });
        }
      });
    });

    this.itemPricingIdentifierService.setDeletedItemPricing([]);
    this.irtIndustryStandardService.setDeletedIdentifier([]);
    this.itemMstDistPricesServices.setDeletedConversion([]);
  }

  private saveFormData() {
    console.log('NotesComponent::saveFormData()');

    this.itemMaster.internalNotes = this.internalNotes;
    this.itemMaster.tempNotes = this.notesForm.get(['notes']).value;
  }

  private updateFormData() {
    console.log('NotesComponent::updateFormData()');

    this.itemMaster = this.itemMasterService.getItemMaster();
    this.notesForm.patchValue({
      notes: this.itemMaster.tempNotes,
      internalNotes: this.itemMaster.internalNotes
    });

    this.internalNotes = this.notesForm.get(['internalNotes']).value !== undefined ? this.notesForm.get(['internalNotes']).value : '';
  }

  previous() {
    console.log('NotesComponent::previous()');

    this.previousTab.emit(this.currentTab);
  }
}
