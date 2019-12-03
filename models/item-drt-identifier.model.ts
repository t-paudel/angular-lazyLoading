import { Moment } from 'moment';

export interface IItemDrtIdentifier {
  id?: string;
  itemIrtIdentifierId?: string;
  identifierCodeQualifier?: string;
  identifierCodeQualifierName?: string;
  identifierCodeQualifierDesc?: string;
  expirationRequired?: string;
  specificTpRequired?: string;
  modifiedBy?: number;
  modifiedDate?: Moment;
  createdDate?: Moment;
  createdBy?: number;
  duplicatesAllowed?: string;
}

export class ItemDrtIdentifier implements IItemDrtIdentifier {
  constructor(
    public id?: string,
    public itemIrtIdentifierId?: string,
    public identifierCodeQualifier?: string,
    public identifierCodeQualifierName?: string,
    public identifierCodeQualifierDesc?: string,
    public expirationRequired?: string,
    public specificTpRequired?: string,
    public modifiedBy?: number,
    public modifiedDate?: Moment,
    public createdDate?: Moment,
    public createdBy?: number,
    public duplicatesAllowed?: string
  ) {}
}
