import { Moment } from 'moment';

export interface ICompanyMaster {
  id?: string;
  businessUnit?: number;
  companyName?: string;
  companyType?: number;
  tradeClass?: number;
  groups?: number;
  billToNo?: string;
  billToName?: string;
  billToAddress1?: string;
  billToAddress2?: string;
  billToStreet?: string;
  billToCity?: string;
  billToState?: string;
  billToZip?: string;
  billToCountry?: string;
  shipToName?: string;
  shipToAddress1?: string;
  shipToAddress2?: string;
  shipToStreet?: string;
  shipToCity?: string;
  shipToState?: string;
  shipToZip?: string;
  shipToCountry?: string;
  contactName1?: string;
  role1?: string;
  phoneNo1?: string;
  emailId1?: string;
  contactName2?: string;
  role2?: string;
  phoneNo2?: string;
  emailId2?: string;
  contactName3?: string;
  role3?: string;
  phoneNo3?: string;
  emailId3?: string;
  contactName4?: string;
  role4?: string;
  phoneNo4?: string;
  emailId4?: string;
  parentCompanyNo?: string;
  companyEdiNo?: string;
  companyEdiBilltoNo?: string;
  companyDeaNo?: string;
  hinNo?: string;
  hrsaNo?: string;
  otherId?: string;
  companyshipToNo?: string;
  statelicenseNo?: string;
  flag1?: number;
  flag2?: number;
  flag3?: number;
  flag4?: number;
  flag5?: number;
  termsCode?: number;
  termsDescription?: string;
  termsPercentage?: number;
  termsPayDays?: number;
  termsNetDays?: number;
  udcs?: string;
  chargebackPaymentMethod?: number;
  chargebackPaymentFrequency?: number;
  flag6?: number;
  chargebackAccuralAmount?: number;
  flag7?: number;
  flag8?: number;
  flag9?: number;
  rebatePaymentMethod?: number;
  rebatePaymentFrequency?: number;
  flag10?: number;
  rebateAccuralAmount?: number;
  adminfeePaymentMethod?: number;
  adminfeePaymentFrequency?: number;
  flag11?: number;
  adminfeeAccuralAmount?: number;
  generalPaymentMethod?: number;
  generalPaymentFrequency?: number;
  flag12?: number;
  generalAccuralAmount?: number;
  internalNotes?: string;
  companyStatus?: number;
  status?: string;
  deaExpirationDate?: Moment;
  gracePeriod?: number;
  companyId?: number;
  dateAcctOpened?: Moment;
  dateAcctClosed?: Moment;
  facilityTypeId?: number;
  shipToNo?: string;
  parentCompanyName?: string;
  glnNo?: string;
  parentCompanyId?: number;
  wac?: string;
  bptCode?: string;
  threshold?: number;
  netDistributor?: string;
  administrator?: string;
  companyNo?: string;
  lastModifiedExternal?: Moment;
  autoValidate?: string;
  cmGen?: string;
  primaryIdType?: string;
  edi850Flag?: string;
  companyShortname?: string;
  edi849Flag?: string;
  edi844Flag?: string;
  drugSchedules?: string;
  companyName2?: string;
  tradeClassSubcode?: string;
  paymentIndicator?: string;
  slaCalendarId?: number;
  tradeClassStartDate?: Moment;
  tradeClassEndDate?: Moment;
  regionCode?: string;
  billToShipTo?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  payableTo?: string;
  billToPayableTo?: string;
  shipToPayableTo?: string;
  standard844?: string;
  standard849?: string;
  slaEdiDays?: number;
  slaManualDays?: number;
  companyDesignation?: string;
  edi850Eligible?: string;
  standard850?: string;
  userId?: number;
  lastUpdatedDate?: Moment;
  createdBy?: number;
  createdDate?: Moment;
  modifiedBy?: number;
  modifiedDate?: Moment;
  medicaidAutoValidate?: number;
  medicaidValidationProfile?: number;
  medicaidSlaCalendar?: number;
  medicaidGracePeriod?: string;
  medicaidBasisDateInt?: number;
  medicaidBasisDateExt?: number;
  medicaidSlaEdiInt?: string;
  medicaidSlaEdiExt?: string;
  medicaidSlaManualInt?: string;
  medicaidSlaManualExt?: string;
  invoiceEligible?: number;
  rosiEligible?: number;
  pqasEligible?: number;
  invoiceStandard?: number;
  rosiStandard?: number;
  pqasStandard?: number;
  cbBasisDate?: number;
  programType?: number;
  medicaidRecId?: number;
  medicaidProgram?: number;
  companySubType?: number;
  medicaidThreshold?: string;
  medicaidNetworkPath?: string;
  pathFileTransfer?: string;
  labelerContact?: string;
  labelerPhone?: string;
  labelerFax?: string;
  dollarMax?: number;
  batchId?: string;
}

export class CompanyMaster implements ICompanyMaster {
  constructor(
    public id?: string,
    public businessUnit?: number,
    public companyName?: string,
    public companyType?: number,
    public tradeClass?: number,
    public groups?: number,
    public billToNo?: string,
    public billToName?: string,
    public billToAddress1?: string,
    public billToAddress2?: string,
    public billToStreet?: string,
    public billToCity?: string,
    public billToState?: string,
    public billToZip?: string,
    public billToCountry?: string,
    public shipToName?: string,
    public shipToAddress1?: string,
    public shipToAddress2?: string,
    public shipToStreet?: string,
    public shipToCity?: string,
    public shipToState?: string,
    public shipToZip?: string,
    public shipToCountry?: string,
    public contactName1?: string,
    public role1?: string,
    public phoneNo1?: string,
    public emailId1?: string,
    public contactName2?: string,
    public role2?: string,
    public phoneNo2?: string,
    public emailId2?: string,
    public contactName3?: string,
    public role3?: string,
    public phoneNo3?: string,
    public emailId3?: string,
    public contactName4?: string,
    public role4?: string,
    public phoneNo4?: string,
    public emailId4?: string,
    public parentCompanyNo?: string,
    public companyEdiNo?: string,
    public companyEdiBilltoNo?: string,
    public companyDeaNo?: string,
    public hinNo?: string,
    public hrsaNo?: string,
    public otherId?: string,
    public companyshipToNo?: string,
    public statelicenseNo?: string,
    public flag1?: number,
    public flag2?: number,
    public flag3?: number,
    public flag4?: number,
    public flag5?: number,
    public termsCode?: number,
    public termsDescription?: string,
    public termsPercentage?: number,
    public termsPayDays?: number,
    public termsNetDays?: number,
    public udcs?: string,
    public chargebackPaymentMethod?: number,
    public chargebackPaymentFrequency?: number,
    public flag6?: number,
    public chargebackAccuralAmount?: number,
    public flag7?: number,
    public flag8?: number,
    public flag9?: number,
    public rebatePaymentMethod?: number,
    public rebatePaymentFrequency?: number,
    public flag10?: number,
    public rebateAccuralAmount?: number,
    public adminfeePaymentMethod?: number,
    public adminfeePaymentFrequency?: number,
    public flag11?: number,
    public adminfeeAccuralAmount?: number,
    public generalPaymentMethod?: number,
    public generalPaymentFrequency?: number,
    public flag12?: number,
    public generalAccuralAmount?: number,
    public internalNotes?: string,
    public companyStatus?: number,
    public status?: string,
    public deaExpirationDate?: Moment,
    public gracePeriod?: number,
    public companyId?: number,
    public dateAcctOpened?: Moment,
    public dateAcctClosed?: Moment,
    public facilityTypeId?: number,
    public shipToNo?: string,
    public parentCompanyName?: string,
    public glnNo?: string,
    public parentCompanyId?: number,
    public wac?: string,
    public bptCode?: string,
    public threshold?: number,
    public netDistributor?: string,
    public administrator?: string,
    public companyNo?: string,
    public lastModifiedExternal?: Moment,
    public autoValidate?: string,
    public cmGen?: string,
    public primaryIdType?: string,
    public edi850Flag?: string,
    public companyShortname?: string,
    public edi849Flag?: string,
    public edi844Flag?: string,
    public drugSchedules?: string,
    public companyName2?: string,
    public tradeClassSubcode?: string,
    public paymentIndicator?: string,
    public slaCalendarId?: number,
    public tradeClassStartDate?: Moment,
    public tradeClassEndDate?: Moment,
    public regionCode?: string,
    public billToShipTo?: string,
    public address1?: string,
    public address2?: string,
    public city?: string,
    public state?: string,
    public zip?: string,
    public country?: string,
    public payableTo?: string,
    public billToPayableTo?: string,
    public shipToPayableTo?: string,
    public standard844?: string,
    public standard849?: string,
    public slaEdiDays?: number,
    public slaManualDays?: number,
    public companyDesignation?: string,
    public edi850Eligible?: string,
    public standard850?: string,
    public userId?: number,
    public lastUpdatedDate?: Moment,
    public createdBy?: number,
    public createdDate?: Moment,
    public modifiedBy?: number,
    public modifiedDate?: Moment,
    public medicaidAutoValidate?: number,
    public medicaidValidationProfile?: number,
    public medicaidSlaCalendar?: number,
    public medicaidGracePeriod?: string,
    public medicaidBasisDateInt?: number,
    public medicaidBasisDateExt?: number,
    public medicaidSlaEdiInt?: string,
    public medicaidSlaEdiExt?: string,
    public medicaidSlaManualInt?: string,
    public medicaidSlaManualExt?: string,
    public invoiceEligible?: number,
    public rosiEligible?: number,
    public pqasEligible?: number,
    public invoiceStandard?: number,
    public rosiStandard?: number,
    public pqasStandard?: number,
    public cbBasisDate?: number,
    public programType?: number,
    public medicaidRecId?: number,
    public medicaidProgram?: number,
    public companySubType?: number,
    public medicaidThreshold?: string,
    public medicaidNetworkPath?: string,
    public pathFileTransfer?: string,
    public labelerContact?: string,
    public labelerPhone?: string,
    public labelerFax?: string,
    public dollarMax?: number,
    public batchId?: string
  ) {}
}
