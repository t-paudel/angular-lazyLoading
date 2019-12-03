import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemMaster, IItemMaster } from 'app/shared/model/product/item-master.model';
import { ItemMasterService } from 'app/shared/services/product/item-master.service';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { CustomValidators } from 'app/shared/util/custom.validators';

@Component({
  selector: 'jhi-additional-information',
  templateUrl: './additional-information.component.html',
  styleUrls: ['./additional-information.component.scss']
})
export class AdditionalInformationComponent implements OnInit {
  @Output() nextTab = new EventEmitter();
  @Output() previousTab = new EventEmitter();

  currentTab = '5';
  itemMaster: IItemMaster;

  additionalInfoForm = this.fb.group({
    labelercode: [null, [Validators.maxLength(100)]],
    packagesizecode: [null, [Validators.maxLength(20)]],
    packagesizeIntrodate: [],
    upps: [null, [Validators.maxLength(100)]],
    desiindicationCode: [],
    margin: [null, [Validators.maxLength(10)]],
    clottingFactor: [],
    clottingFactorDateGroup: this.fb.group(
      {
        clottingfactorStartdate: [],
        clottingfactorEnddate: []
      },
      { validators: CustomValidators.compareStartAndEnddate }
    ),

    pediatricExclusive: [],
    pediatricExclusiveDateGroup: this.fb.group(
      {
        pediatricexclusiveStartdate: [],
        pediatricexclusiveEnddate: []
      },
      { validators: CustomValidators.compareStartAndEnddate }
    ),

    newformulation: [],
    newformulationproduct: [null, [Validators.maxLength(100)]],
    newFormulationDateGroup: this.fb.group(
      {
        newformulationStartdate: [],
        newformulationEnddate: []
      },
      { validators: CustomValidators.compareStartAndEnddate }
    ),

    brandInformation: [],
    brandInformationProduct: [null, [Validators.maxLength(100)]],
    brandInformationDateGroup: this.fb.group(
      {
        brandInformationStartdate: [],
        brandInformationEnddate: []
      },
      { validators: CustomValidators.compareStartAndEnddate }
    )
  });

  constructor(private fb: FormBuilder, protected itemMasterService: ItemMasterService) {}

  ngOnInit() {
    console.log('AdditionalInformationComponent::ngOnInit()');

    if (this.itemMasterService.getMode() === 'view') {
      this.additionalInfoForm.disable();
    }
    this.updateFormData();
  }

  next() {
    console.log('AdditionalInformationComponent::next()');

    this.itemMasterService.setAdditionalInfoFormIsValid(!this.additionalInfoForm.invalid);
    console.log('form is valid = ' + this.itemMasterService.getAdditionalInfoFormIsValid());
    this.nextTab.emit(this.currentTab);
  }

  previous() {
    console.log('AdditionalInformationComponent::previous()');

    this.itemMasterService.setAdditionalInfoFormIsValid(!this.additionalInfoForm.invalid);
    console.log('form is valid = ' + this.itemMasterService.getAdditionalInfoFormIsValid());
    this.previousTab.emit(this.currentTab);
  }

  savePartialData() {
    console.log('AdditionalInformationComponent::savePartialData()');

    this.itemMaster = new ItemMaster();
    this.itemMaster = this.itemMasterService.getItemMaster();
    this.saveFormData();
    this.itemMasterService.setItemMaster(this.itemMaster);
  }

  private saveFormData() {
    console.log('AdditionalInformationComponent::saveFormData()');

    (this.itemMaster.labelercode = this.additionalInfoForm.get(['labelercode']).value),
      (this.itemMaster.packagesizeIntrodate =
        this.additionalInfoForm.get(['packagesizeIntrodate']).value !== null
          ? moment(this.additionalInfoForm.get(['packagesizeIntrodate']).value, DATE_FORMAT)
          : undefined),
      (this.itemMaster.desiindicationCode = this.additionalInfoForm.get(['desiindicationCode']).value);
    this.itemMaster.packagesizecode = this.additionalInfoForm.get(['packagesizecode']).value;
    this.itemMaster.upps = this.additionalInfoForm.get(['upps']).value;
    this.itemMaster.margin = this.additionalInfoForm.get(['margin']).value;
    this.itemMaster.clottingFactor = this.additionalInfoForm.get(['clottingFactor']).value;
    this.itemMaster.clottingfactorEnddate =
      this.additionalInfoForm.value.clottingFactorDateGroup.clottingfactorEnddate !== null
        ? moment(this.additionalInfoForm.value.clottingFactorDateGroup.clottingfactorEnddate, DATE_FORMAT)
        : undefined;
    this.itemMaster.clottingfactorStartdate =
      this.additionalInfoForm.value.clottingFactorDateGroup.clottingfactorStartdate !== null
        ? moment(this.additionalInfoForm.value.clottingFactorDateGroup.clottingfactorStartdate, DATE_FORMAT)
        : undefined;
    this.itemMaster.pediatricExclusive = this.additionalInfoForm.get(['pediatricExclusive']).value;
    this.itemMaster.pediatricexclusiveEnddate =
      this.additionalInfoForm.value.pediatricExclusiveDateGroup.pediatricexclusiveEnddate !== null
        ? moment(this.additionalInfoForm.value.pediatricExclusiveDateGroup.pediatricexclusiveEnddate, DATE_FORMAT)
        : undefined;
    this.itemMaster.pediatricexclusiveStartdate =
      this.additionalInfoForm.value.pediatricExclusiveDateGroup.pediatricexclusiveStartdate !== null
        ? moment(this.additionalInfoForm.value.pediatricExclusiveDateGroup.pediatricexclusiveStartdate, DATE_FORMAT)
        : undefined;
    this.itemMaster.newformulation = this.additionalInfoForm.get(['newformulation']).value;
    this.itemMaster.newformulationproduct = this.additionalInfoForm.get(['newformulationproduct']).value;
    this.itemMaster.newformulationEnddate =
      this.additionalInfoForm.value.newFormulationDateGroup.newformulationEnddate !== null
        ? moment(this.additionalInfoForm.value.newFormulationDateGroup.newformulationEnddate, DATE_FORMAT)
        : undefined;
    this.itemMaster.newformulationStartdate =
      this.additionalInfoForm.value.newFormulationDateGroup.newformulationStartdate !== null
        ? moment(this.additionalInfoForm.value.newFormulationDateGroup.newformulationStartdate, DATE_FORMAT)
        : undefined;
    this.itemMaster.brandInformation = this.additionalInfoForm.get(['brandInformation']).value;
    this.itemMaster.brandInformationProduct = this.additionalInfoForm.get(['brandInformationProduct']).value;
    this.itemMaster.brandInformationStartdate =
      this.additionalInfoForm.value.brandInformationDateGroup.brandInformationStartdate !== null
        ? moment(this.additionalInfoForm.value.brandInformationDateGroup.brandInformationStartdate, DATE_FORMAT)
        : undefined;
    this.itemMaster.brandInformationEnddate =
      this.additionalInfoForm.value.brandInformationDateGroup.brandInformationEnddate !== null
        ? moment(this.additionalInfoForm.value.brandInformationDateGroup.brandInformationEnddate, DATE_FORMAT)
        : undefined;
  }

  private updateFormData() {
    this.itemMaster = this.itemMasterService.getItemMaster();

    this.additionalInfoForm.patchValue({
      clottingFactorDateGroup: {
        clottingfactorEnddate:
          this.itemMaster.clottingfactorEnddate !== null && this.itemMaster.clottingfactorEnddate !== undefined
            ? this.itemMaster.clottingfactorEnddate.format(DATE_FORMAT)
            : null,
        clottingfactorStartdate:
          this.itemMaster.clottingfactorStartdate !== null && this.itemMaster.clottingfactorStartdate !== undefined
            ? this.itemMaster.clottingfactorStartdate.format(DATE_FORMAT)
            : null
      },
      clottingFactor: this.itemMaster.clottingFactor,
      desiindicationCode: this.itemMaster.desiindicationCode,
      pediatricExclusiveDateGroup: {
        pediatricexclusiveEnddate:
          this.itemMaster.pediatricexclusiveEnddate !== null && this.itemMaster.pediatricexclusiveEnddate !== undefined
            ? this.itemMaster.pediatricexclusiveEnddate.format(DATE_FORMAT)
            : null,
        pediatricexclusiveStartdate:
          this.itemMaster.pediatricexclusiveStartdate !== null && this.itemMaster.pediatricexclusiveStartdate !== undefined
            ? this.itemMaster.pediatricexclusiveStartdate.format(DATE_FORMAT)
            : null
      },
      pediatricExclusive: this.itemMaster.pediatricExclusive,
      newformulation: this.itemMaster.newformulation,
      newformulationproduct: this.itemMaster.newformulationproduct,
      newFormulationDateGroup: {
        newformulationEnddate:
          this.itemMaster.newformulationEnddate !== null && this.itemMaster.newformulationEnddate !== undefined
            ? this.itemMaster.newformulationEnddate.format(DATE_FORMAT)
            : null,
        newformulationStartdate:
          this.itemMaster.newformulationStartdate !== null && this.itemMaster.newformulationStartdate !== undefined
            ? this.itemMaster.newformulationStartdate.format(DATE_FORMAT)
            : null
      },
      brandInformation: this.itemMaster.brandInformation,
      brandInformationProduct: this.itemMaster.brandInformationProduct,
      brandInformationDateGroup: {
        brandInformationStartdate:
          this.itemMaster.brandInformationStartdate !== null && this.itemMaster.brandInformationStartdate !== undefined
            ? this.itemMaster.brandInformationStartdate.format(DATE_FORMAT)
            : null,
        brandInformationEnddate:
          this.itemMaster.brandInformationEnddate !== null && this.itemMaster.brandInformationEnddate !== undefined
            ? this.itemMaster.brandInformationEnddate.format(DATE_FORMAT)
            : null
      },
      upps: this.itemMaster.upps,
      labelercode: this.itemMaster.labelercode,
      packagesizecode: this.itemMaster.packagesizecode,
      packagesizeIntrodate:
        this.itemMaster.packagesizeIntrodate !== null && this.itemMaster.packagesizeIntrodate !== undefined
          ? this.itemMaster.packagesizeIntrodate.format(DATE_FORMAT)
          : null,
      margin: this.itemMaster.margin
    });
  }
}
