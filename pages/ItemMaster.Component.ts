import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IItemMaster, ItemMaster } from 'app/shared/model/product/item-master.model';
import { SearchCriteria } from 'app/shared/model/product/searchcriteria.model';
import { IItemStatus } from 'app/shared/model/product/item-status.model';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IItemDrtIdentifier } from 'app/shared/model/product/item-drt-identifier.model';
import { IItemType } from 'app/shared/model/product/item-type.model';
import { ItemStatusService } from 'app/shared/services/product/item-status.service';
import { ItemMasterService } from 'app/shared/services/product/item-master.service';
import { ItemDrtIdentifierService } from 'app/shared/services/product/item-drt-identifier.service';
import { ItemTypeService } from 'app/shared/services/product/item-type.service';
import { CompanyMasterService } from 'app/shared/services/companymaster/company-master.service';
import { ICompanyMaster } from 'app/shared/model/companymaster/company-master.model';
import { ExportData } from 'app/shared/util/table-export';

@Component({
  selector: 'jhi-item-master',
  templateUrl: './ItemMaster.component.html',
  styleUrls: ['./ItemMaster.component.scss'],
  providers: []
})
export class ItemMasterComponent implements OnInit {
  headerRowForItemMaster = ['Item ID', 'Item #', 'Item Name', 'Item Description', 'Item Type', 'Status', 'Manufacturer #'];
  itemMasterList: IItemMaster[];

  private list: Array<SearchCriteria>;

  itemstatuses: IItemStatus[];
  itemdrtidentifiers: IItemDrtIdentifier[];
  itemtypes: IItemType[];
  manufacturer: ICompanyMaster[];

  hoveredRow = -1;
  selectedRow = -1;
  formValid = false;

  editForm = this.fb.group({
    itemId: [],
    itemNo: [null, [Validators.required]],
    itemName: [null, [Validators.required, Validators.maxLength(240)]],
    itemDesc: [null, [Validators.maxLength(4000)]],
    identifierCodeQualifierName: [{ value: null, disabled: true }],
    manufacturerNoId: [{ value: null, disabled: true }],
    itemTypeId: [],
    statusId: [],
    identifierCodeQualifier: []
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    protected itemStatusService: ItemStatusService,
    protected itemMasterService: ItemMasterService,
    protected itemDrtIdentifier: ItemDrtIdentifierService,
    protected itemDrtIdentifierService: ItemDrtIdentifierService,
    protected itemTypeService: ItemTypeService,
    protected companyMasterService: CompanyMasterService
  ) {}

  ngOnInit() {
    console.log('ItemMasterComponent::ngOnInit()');

    this.itemStatusService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemStatus[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemStatus[]>) => response.body)
      )
      .subscribe((res: IItemStatus[]) => (this.itemstatuses = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.itemDrtIdentifierService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemDrtIdentifier[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemDrtIdentifier[]>) => response.body)
      )
      .subscribe((res: IItemDrtIdentifier[]) => (this.itemdrtidentifiers = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.itemTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemType[]>) => response.body)
      )
      .subscribe((res: IItemType[]) => (this.itemtypes = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.companyMasterService.findCompanyAsManufacturer().subscribe(
      res => {
        this.manufacturer = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  onError(message: string): any {
    throw new Error('Method not implemented.' + message);
  }

  addItem() {
    console.log('ItemMasterComponent::addItem()');
    const item: IItemMaster = new ItemMaster();
    this.itemMasterService.setItemMaster(item);
  }

  search() {
    console.log('ItemMasterComponent::search()');

    console.log('valid = ' + this.formValid);
    this.formValidation();

    if (!this.formValid) {
      alert('Please enter a search criteria!!');
      this.editForm.reset();
      return;
    }

    this.fieldsValidation();

    new Promise(resolve => {
      this.itemMasterService.getSearchResults(this.list).subscribe(res => {
        this.itemMasterList = res.body;
        resolve(res);
      });
    })
      .then(() => {
        this.itemMasterList.forEach(data => {
          this.setValues(data);
        });
      })
      .then(() => {
        if (this.itemMasterList.length === 0) {
          alert('No results found!!');
          this.editForm.reset();
        }
      });
  }

  onDehover() {
    this.hoveredRow = -1;
  }

  onHover(i) {
    this.hoveredRow = i;
  }

  onSelect(i) {
    this.selectedRow = i;
  }

  deleteItem() {
    console.log('ItemMasterComponent::deleteItem()');

    const itemId = this.itemMasterList[this.selectedRow].id;
    this.itemMasterService.delete(itemId).subscribe();
  }

  updateItem() {
    console.log('ItemMasterComponent::updateItem()');

    if (this.selectedRow === -1) {
      alert('Please select a row to edit!!');
      return;
    }

    const itemId = this.itemMasterList[this.selectedRow].id;
    new Promise(resolve => {
      this.itemMasterService.findItem(itemId).then((data: IItemMaster) => {
        this.itemMasterService.setItemMaster(data);
        resolve(data);
      });
    }).then(() => {
      this.router.navigate(['/globalfiles/itm/edit']);
    });
  }

  viewItem() {
    console.log('ItemMasterComponent::viewItem()');

    const itemId = this.itemMasterList[this.selectedRow].id;

    new Promise(resolve => {
      this.itemMasterService.findItem(itemId).then((data: IItemMaster) => {
        this.itemMasterService.setItemMaster(data);
        resolve(data);
      });
    }).then(() => {
      this.router.navigate(['/globalfiles/itm/view']);
    });
  }

  reset() {
    console.log('ItemMasterComponent::reset()');

    this.itemMasterList = null;
    this.editForm.reset();
  }

  fieldsValidation() {
    console.log('ItemMasterComponent::fieldsValidation()');

    this.list = new Array<SearchCriteria>();
    for (const field in this.editForm.controls) {
      if (this.editForm.controls[field].value != null && this.editForm.controls[field].value !== '') {
        const control: FormControl = <FormControl>this.editForm.controls[field];
        const searchCriteria: SearchCriteria = new SearchCriteria();
        searchCriteria.fieldId = field;
        searchCriteria.fieldValue = control.value;
        if (typeof control.value === 'string' && control.value.includes('*')) {
          searchCriteria.fieldExpression = 'LIKE';
        } else {
          searchCriteria.fieldExpression = 'EQUALS';
        }
        this.list.push(searchCriteria);
      }
    }
    console.log(this.list);
  }

  formValidation() {
    for (const field in this.editForm.controls) {
      if (this.editForm.controls[field].value !== null && this.editForm.controls[field].value !== '') {
        this.formValid = true;
      }
    }
  }

  export(tableId: string) {
    console.log('ItemMasterComponent::export()');

    if (tableId === null || tableId === '') {
      alert('Please provide a table ID!!');
      return;
    }

    ExportData.exportToCSV(tableId);
  }

  setValues(data: IItemMaster) {
    this.itemtypes.forEach(type => {
      if (type.id === data.itemTypeId) {
        data.itemTypeName = type.description;
      }
    });

    this.itemstatuses.forEach(status => {
      if (status.id === data.statusId) {
        data.itemStatus = status.description;
      }
    });

    this.manufacturer.forEach(manufacturer => {
      if (manufacturer.id === data.manufacturerNoId) {
        data.manufacturerNo = manufacturer.companyNo;
      }
    });

    console.log(data.manufacturerNo);
  }
}
