import { Moment } from 'moment';

export interface IItemPricingIdentifer {
  id?: string;
  itemPriceQualifierId?: string;
  itemPrice?: number;
  startDate?: Moment;
  endDate?: Moment;
  tpId?: number;
  createdBy?: number;
  createdDate?: Moment;
  modifiedBy?: number;
  modifiedDate?: Moment;
  inboundStatus?: string;
  batchId?: string;
  priceQualifierName?: string; // added externally
}

export class ItemPricingIdentifer implements IItemPricingIdentifer {
  constructor(
    public id?: string,
    public itemPriceQualifierId?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public tpId?: number,
    public createdBy?: number,
    public createdDate?: Moment,
    public modifiedBy?: number,
    public modifiedDate?: Moment,
    public inboundStatus?: string,
    public batchId?: string,
    public priceQualifierName?: string // added externally
  ) {}
}
