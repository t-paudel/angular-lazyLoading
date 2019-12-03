import { Moment } from 'moment';

export interface IIrtIndustryStandard {
  id?: string;
  itemIrtIdentifier?: string;
  itemIrtIdentifierId?: string;
  endDate?: Moment;
  startDate?: Moment;
  modifiedBy?: number;
  modifiedDate?: Moment;
  entityCode?: string;
  createdDate?: Moment;
  createdBy?: number;
  inboundStatus?: string;
  batchId?: string;
  identifierCodeQualifierName?: string; // Added externally
}

export class IrtIndustryStandard implements IIrtIndustryStandard {
  constructor(
    public id?: string,
    public itemIrtIdentifier?: string,
    public itemIrtIdentifierId?: string,
    public endDate?: Moment,
    public startDate?: Moment,
    public modifiedBy?: number,
    public modifiedDate?: Moment,
    public entityCode?: string,
    public createdDate?: Moment,
    public createdBy?: number,
    public inboundStatus?: string,
    public batchId?: string,
    public identifierCodeQualifierName?: string
  ) {}
}
