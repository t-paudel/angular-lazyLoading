import { Component, OnInit, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { IIrtIndustryStandard, IrtIndustryStandard } from 'app/shared/model/product/irt-industry-standard.model';
import { IItemDrtIdentifier } from 'app/shared/model/product/item-drt-identifier.model';
import { ItemDrtIdentifierService } from 'app/shared/services/product/item-drt-identifier.service';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DATE_FORMAT } from 'app/shared';
import * as moment from 'moment';
import { IItemMaster, ItemMaster } from 'app/shared/model/product/item-master.model';
import { ItemMasterService } from 'app/shared/services/product/item-master.service';
import { IrtIndustryStandardService } from 'app/shared/services/product/irt-industry-standard.service';
import { CustomValidators } from 'app/shared/util/custom.validators';

@Component({
  selector: 'jhi-identifiers',
  templateUrl: './identifiers.component.html',
  styleUrls: ['./identifiers.component.scss']
})
export class IdentifiersComponent implements OnInit {
  @Output() nextTab = new EventEmitter();
  @Output() previousTab = new EventEmitter();

  currentTab = '2';
  hoveredRow = -1;
  selectedRow = -1;
  deleteButtonDisabled = true;
  wasInside = false;
  disableComponents = false;

  itemMaster: IItemMaster;
  itemdrtidentifiers: IItemDrtIdentifier[];
  irtIndustryStandardList: IIrtIndustryStandard[] = [];
  deletedIdentifier: string[];

  displayDataForIdentifiersArray: IIrtIndustryStandard[] = [];
  displayDataForIdentifiers: IIrtIndustryStandard;

  headerRow = ['IdentifierCode Qualifier Name', 'Identification Code', 'Start Date', 'End Date'];

  identifiersForm = this.fb.group({
    identifierCodeQualifierName: [null, [Validators.maxLength(360)]],
    identifierCodeQualifier: [null, [Validators.maxLength(50)]],
    identifierDateGroup: this.fb.group(
      {
        identifierStartDate: [],
        identifierEndDate: []
      },
      { validator: CustomValidators.compareStartAndEnddate }
    )
  });

  constructor(
    private fb: FormBuilder,
    protected itemDrtIdentifierService: ItemDrtIdentifierService,
    protected itemMasterService: ItemMasterService,
    protected irtIndustryStandardService: IrtIndustryStandardService,
    private eRef: ElementRef
  ) {}

  ngOnInit() {
    console.log('IdentifiersComponent::ngOnInit()');

    this.itemDrtIdentifierService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemDrtIdentifier[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemDrtIdentifier[]>) => response.body)
      )
      .subscribe((res: IItemDrtIdentifier[]) => (this.itemdrtidentifiers = res), (res: HttpErrorResponse) => this.onError(res.message));

    if (this.itemMasterService.getMode() === 'edit' || this.itemMasterService.getMode() === 'view') {
      if (this.irtIndustryStandardService.getPageLoadingForFirstTime()) {
        console.log('edit or view mode');
        this.loadDataForUpdate();
      }
    }

    if (this.itemMasterService.getMode() === 'view') {
      this.disableComponents = true;
      this.identifiersForm.disable();
    }

    this.itemMasterService.setTouchedIdentifierTab(true);
    this.updateFormData();

    if (this.displayDataForIdentifiersArray.length === 0) {
      this.deleteButtonDisabled = true;
    } else {
      this.deleteButtonDisabled = false;
    }
  }

  onError(message: string): any {
    throw new Error('Method not implemented.');
  }

  addRow() {
    console.log('IdentifiersComponent::addRow()');

    if (this.identifiersForm.get(['identifierCodeQualifierName']).value === null) {
      alert('Please enter Identifier Code Qualifier Name!!');
      return;
    }

    if (this.identifiersForm.get(['identifierDateGroup']).errors !== null) {
      if (this.identifiersForm.get(['identifierDateGroup']).errors.EndDateGreater) {
        alert('End Date cannot be smaller than Start Date!!');
        return;
      }
    }

    this.displayDataForIdentifiers = new IrtIndustryStandard();

    let itemIdentifierId;
    let itemQualifierName;
    const createdDate = new Date();

    for (let i = 0; i < this.itemdrtidentifiers.length; i++) {
      if (this.itemdrtidentifiers[i].id === this.identifiersForm.get(['identifierCodeQualifierName']).value) {
        itemIdentifierId = this.itemdrtidentifiers[i].id;
        itemQualifierName = this.itemdrtidentifiers[i].identifierCodeQualifierName;
        break;
      }
    }

    this.displayDataForIdentifiers.itemIrtIdentifierId = itemIdentifierId;
    this.displayDataForIdentifiers.identifierCodeQualifierName = itemQualifierName;
    this.displayDataForIdentifiers.itemIrtIdentifier = this.identifiersForm.get(['identifierCodeQualifier']).value;
    this.displayDataForIdentifiers.startDate =
      this.identifiersForm.value.identifierDateGroup.identifierStartDate !== null
        ? moment(this.identifiersForm.value.identifierDateGroup.identifierStartDate, DATE_FORMAT)
        : undefined;
    this.displayDataForIdentifiers.endDate =
      this.identifiersForm.value.identifierDateGroup.identifierEndDate !== null
        ? moment(this.identifiersForm.value.identifierDateGroup.identifierEndDate, DATE_FORMAT)
        : undefined;
    this.displayDataForIdentifiers.createdDate = createdDate != null ? moment(createdDate, DATE_FORMAT) : undefined;
    this.displayDataForIdentifiers.modifiedDate = createdDate != null ? moment(createdDate, DATE_FORMAT) : undefined;

    this.displayDataForIdentifiersArray.push(this.displayDataForIdentifiers);
    this.deleteButtonDisabled = false;

    this.identifiersForm.reset();
  }

  deleteRow() {
    console.log('AddItemComponent::deleteRow()');

    if (this.selectedRow === -1) {
      alert('Please select a row to delete!!');
      return;
    }

    for (let i = 0; i <= this.displayDataForIdentifiersArray.length; i++) {
      if (i === this.selectedRow) {
        if (this.displayDataForIdentifiersArray[i].id !== null && this.displayDataForIdentifiersArray[i].id !== undefined) {
          this.deletedIdentifier.push(this.displayDataForIdentifiersArray[i].id);
        }
        this.displayDataForIdentifiersArray.splice(i, 1);
        break;
      }
    }

    if (this.displayDataForIdentifiersArray.length === 0) {
      this.deleteButtonDisabled = true;
    }

    this.selectedRow = -1;
  }

  savePartialData() {
    console.log('IdentifiersComponent::savePartialData()');

    console.log('industry length -> ' + this.displayDataForIdentifiersArray.length);
    this.irtIndustryStandardService.setIrtIndustryStandardList(this.displayDataForIdentifiersArray);
    console.log('industry length after setting -> ' + this.irtIndustryStandardService.getIrtIndustryStandardList().length);
    this.irtIndustryStandardService.setDeletedIdentifier(this.deletedIdentifier);
  }

  updateFormData() {
    console.log('IdentifiersComponent::updateFormData()');

    this.displayDataForIdentifiersArray = this.irtIndustryStandardService.getIrtIndustryStandardList();
    console.log('industry length -> ' + this.displayDataForIdentifiersArray.length);
    this.deletedIdentifier = this.irtIndustryStandardService.getDeletedIdentifier();
  }

  loadDataForUpdate() {
    console.log('IdentifiersComponent::loadDataForUpdate()');

    this.itemMaster = this.itemMasterService.getItemMaster();

    const identifierCodeQualifierNameList: string[] = [];
    const industryId = this.itemMaster.irtIndustryStandardId;

    if (industryId !== null) {
      new Promise(resolve => {
        this.irtIndustryStandardService.findArray({ id: industryId }).subscribe((data: IIrtIndustryStandard[]) => {
          this.displayDataForIdentifiersArray = data;

          data.forEach(iis => identifierCodeQualifierNameList.push(iis.itemIrtIdentifierId));

          this.itemDrtIdentifierService.findArray({ id: identifierCodeQualifierNameList }).subscribe((result: IItemDrtIdentifier[]) => {
            this.irtIndustryStandardList = result;
            resolve(result);
          });
        });
      }).then(() => {
        this.displayDataForIdentifiersArray.forEach(data => {
          this.setIdentifierCodeQualifierName(data);
        });
      });
    }

    this.irtIndustryStandardService.setIrtIndustryStandardList(this.displayDataForIdentifiersArray);
  }

  setIdentifierCodeQualifierName(data: IIrtIndustryStandard) {
    this.irtIndustryStandardList.forEach(qualifier => {
      if (qualifier.id === data.itemIrtIdentifierId) {
        data.identifierCodeQualifierName = qualifier.identifierCodeQualifierName;
      }
    });
  }

  next() {
    console.log('IdentifiersComponent::next()');

    this.nextTab.emit(this.currentTab);
  }

  previous() {
    console.log('IdentifiersComponent::previous()');

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

  // @HostListener('click',['$event'])
  // clickedInside() {
  //   console.log('IdentifiersComponent::clickedInside()');
  //   console.log(event);
  //   console.log(this.eRef);
  //   this.wasInside = true;
  // }

  // @HostListener('document:click')
  // clickedOutside() {
  //   console.log('IdentifiersComponent::clickedOutside()');

  //   this.selectedRow = -1;
  //   this.wasInside = false;
  // }
  onSelect(i) {
    console.log('IdentifiersComponent::onSelect()');
    this.wasInside = true;
    this.selectedRow = i;
  }

  onDeselect() {
    console.log('IdentifiersComponent::onDeselect()');
    this.wasInside = false;
    this.selectedRow = -1;
  }
}
