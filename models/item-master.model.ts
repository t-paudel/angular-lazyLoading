import { Moment } from 'moment';

export interface IItemMaster {
  id?: string;
  itemNo?: string;
  itemName?: string;
  itemDesc?: string;
  itemTypeId?: string;
  statusId?: string;
  itemStartDate?: Moment;
  itemEndDate?: Moment;
  strengthId?: string;
  ratingId?: string;
  formId?: string;
  itemClassId?: string;
  inventoryLocation?: string;
  substitution?: string;
  lastLotExpiration?: Moment;
  divestedDate?: Moment;
  uomId?: string;
  uom2Id?: string;
  packageSize?: string;
  additionalItemName?: string;
  additionalItemDesc?: string;
  itemCode?: string;
  lineExtension?: string;
  manufacturerNoId?: string;
  manufacturerNameId?: string;
  udcs?: string;
  irtIndustryStandardId?: string[];
  itemPricingIdentifierId?: string[];
  labelercode?: string;
  margin?: string;
  packagesizecode?: string;
  packagesizeIntrodate?: Moment;
  upps?: string;
  desiindicationCode?: string;
  clottingfactorEnddate?: Moment;
  clottingfactorStartdate?: Moment;
  clottingFactor?: string;
  pediatricexclusiveEnddate?: Moment;
  pediatricexclusiveStartdate?: Moment;
  pediatricExclusive?: string;
  newformulation?: string;
  newformulationproduct?: string;
  newformulationEnddate?: Moment;
  newformulationStartdate?: Moment;
  brandInformation?: string;
  brandInformationProduct?: string;
  brandInformationStartdate?: Moment;
  brandInformationEnddate?: Moment;
  internalNotes?: string;
  itemTypeName?: string;
  itemStatus?: string;
  manufacturerNo?: string;
  tempNotes?: string;
}

export class ItemMaster implements IItemMaster {
  constructor(
    public id?: string,
    public itemNo?: string,
    public itemName?: string,
    public itemDesc?: string,
    public packageSize?: string,
    public internalNotes?: string,
    public statusId?: string,
    public inventoryLocation?: string,
    public itemStartDate?: Moment,
    public itemEndDate?: Moment,
    public substitution?: string,
    public additionalItemName?: string,
    public additionalItemDesc?: string,
    public clottingfactorEnddate?: Moment,
    public clottingfactorStartdate?: Moment,
    public clottingFactor?: string,
    public desiindicationCode?: string,
    public itemCode?: string,
    public labelercode?: string,
    public margin?: string,
    public newformulation?: string,
    public newformulationproduct?: string,
    public newformulationEnddate?: Moment,
    public newformulationStartdate?: Moment,
    public packagesizecode?: string,
    public packagesizeIntrodate?: Moment,
    public pediatricexclusiveEnddate?: Moment,
    public pediatricexclusiveStartdate?: Moment,
    public pediatricExclusive?: string,
    public upps?: string,
    public lastLotExpiration?: Moment,
    public lineExtension?: string,
    public divestedDate?: Moment,
    public brandInformation?: string,
    public brandInformationProduct?: string,
    public brandInformationStartdate?: Moment,
    public brandInformationEnddate?: Moment,
    public itemTypeId?: string,
    public itemClassId?: string,
    public strengthId?: string,
    public ratingId?: string,
    public formId?: string,
    public uomId?: string,
    public uom2Id?: string,
    public manufacturerNoId?: string,
    public manufacturerNameId?: string,
    public udcs?: string,
    public irtIndustryStandardId?: string[],
    public itemPricingIdentifierId?: string[],
    public itemTypeName?: string,
    public itemStatus?: string,
    public manufacturerNo?: string,
    public tempNotes?: string
  ) {}
}
