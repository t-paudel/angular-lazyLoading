import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ItemMasterService } from 'app/shared/services/product/item-master.service';
import { ItemMstDistPricesService } from 'app/shared/services/product/item-mst-dist-prices.service';
import { ItemPricingIdentifierService } from 'app/shared/services/product/item-pricing-identifier.service';
import { IrtIndustryStandardService } from 'app/shared/services/product/irt-industry-standard.service';
import { ItemInformationComponent } from '../helperComponents/item-information/item-information.component';
import { IdentifiersComponent } from '../helperComponents/identifiers/identifiers.component';
import { ConversionsComponent } from '../helperComponents/conversions/conversions.component';
import { NotesComponent } from '../helperComponents/notes/notes.component';
import { AdditionalInformationComponent } from '../helperComponents/additional-information/additional-information.component';
import { PricingComponent } from '../helperComponents/pricing/pricing.component';

@Component({
  selector: 'jhi-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  selectedTab = '';
  mode: string;

  @ViewChild('tab', { static: false }) tab: NgbTabset;
  @ViewChild('childItem', { static: false }) childItemInformation: ItemInformationComponent;
  @ViewChild('childItem', { static: false }) childIdentifier: IdentifiersComponent;
  @ViewChild('childItem', { static: false }) childPricing: PricingComponent;
  @ViewChild('childItem', { static: false }) childConversion: ConversionsComponent;
  @ViewChild('childItem', { static: false }) childAdditionalInformation: AdditionalInformationComponent;
  @ViewChild('childItem', { static: false }) childNotes: NotesComponent;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected itemMasterService: ItemMasterService,
    protected irtIndustryStandardService: IrtIndustryStandardService,
    protected itemPricingIdentifierService: ItemPricingIdentifierService,
    protected itemMstDistPricesServices: ItemMstDistPricesService
  ) {}

  ngOnInit() {
    console.log('AddItemComponent::ngOnInit()');

    this.itemPricingIdentifierService.setPageLoadingForFirstTime(true);
    this.irtIndustryStandardService.setPageLoadingForFirstTime(true);
    this.itemMstDistPricesServices.setPageLoadingForFirstTime(true);
    this.itemMasterService.setTouchedConversionTab(false);
    this.itemMasterService.setTouchedIdentifierTab(false);
    this.itemMasterService.setTouchedPricingTab(false);
    this.itemMasterService.setItemInformationFormIsValid(false);

    this.activatedRoute.params.subscribe(value => {
      this.itemMasterService.setMode(value['mode']);
    });
  }

  tabChange(event) {
    console.log('AddItemComponent::tabChange()');

    this.saveChildComponentData(event.activeId);
    this.selectedTab = event.nextId;
  }

  nextTab() {
    console.log('AddItemComponent::nextTab()');

    this.pageLoaded(this.tab.activeId);
    this.tab.select((Number(this.tab.activeId) + 1).toString());
  }

  previousTab() {
    console.log('AddItemComponent::previousTab()');

    this.pageLoaded(this.tab.activeId);
    this.tab.select((Number(this.tab.activeId) - 1).toString());
  }

  pageLoaded(id: string) {
    console.log('AddItemComponent::pageLoaded()');
    console.log('previous tab = ' + id);

    if (id === '2') {
      this.irtIndustryStandardService.setPageLoadingForFirstTime(false);
      return;
    }
    if (id === '3') {
      this.itemPricingIdentifierService.setPageLoadingForFirstTime(false);
      return;
    }
    if (id === '4') {
      this.itemMstDistPricesServices.setPageLoadingForFirstTime(false);
    }
  }

  saveChildComponentData(id: string) {
    console.log('AddItemComponent::saveChildComponentData()');

    switch (id) {
      case '1':
        this.childItemInformation.savePartialData();
        console.log('saved ItemMaster = ');
        console.log(this.itemMasterService.getItemMaster());
        break;

      case '2':
        this.childIdentifier.savePartialData();
        console.log('saved ItemMaster = ');
        console.log(this.itemMasterService.getItemMaster());
        console.log('saved identifiers = ');
        console.log(this.irtIndustryStandardService.getIrtIndustryStandardList());
        console.log('deleted identifiers = ');
        console.log(this.irtIndustryStandardService.getDeletedIdentifier());
        break;

      case '3':
        this.childPricing.savePartialData();
        console.log('saved ItemMaster = ');
        console.log(this.itemMasterService.getItemMaster());
        console.log('saved pricing = ');
        console.log(this.itemPricingIdentifierService.getItemPricingIdentifierList());
        console.log('deleted pricing = ');
        console.log(this.itemPricingIdentifierService.getDeletedItemPricing());
        break;

      case '4':
        this.childConversion.savePartialData();
        console.log('saved ItemMaster = ');
        console.log(this.itemMasterService.getItemMaster());
        console.log('saved conversions = ');
        console.log(this.itemMstDistPricesServices.getConversionsList());
        console.log('deleted conversions = ');
        console.log(this.itemMstDistPricesServices.getDeletedConversion());
        break;

      case '5':
        this.childAdditionalInformation.savePartialData();
        console.log('saved ItemMaster = ');
        console.log(this.itemMasterService.getItemMaster());
        break;

      case '6':
        this.childNotes.savePartialData();
        console.log('saved ItemMaster = ');
        console.log(this.itemMasterService.getItemMaster());
        break;
    }
  }
}
