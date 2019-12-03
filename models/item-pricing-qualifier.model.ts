import { Moment } from 'moment';

export interface IItemPricingQualifier {
  id?: string;
  priceQualifierName?: string;
  expirationRequired?: string;
  specificTpRequired?: string;
  createdBy?: number;
  createdDate?: Moment;
  modifiedBy?: number;
  modifiedDate?: Moment;
}

export class ItemPricingQualifier implements IItemPricingQualifier {
  constructor(
    public id?: string,
    public priceQualifierName?: string,
    public expirationRequired?: string,
    public specificTpRequired?: string,
    public createdBy?: number,
    public createdDate?: Moment,
    public modifiedBy?: number,
    public modifiedDate?: Moment
  ) {}
}
