import { Moment } from 'moment';

export interface IItemMstDistPrices {
  id?: string;
  itemId?: string;
  distId?: string;
  wac?: number;
  list?: number;
  stdCost?: number;
  amp?: number;
  fss?: number;
  usePriceForCalcFlag?: string;
  uomProfile?: string;
  createdBy?: number;
  createdDate?: Moment;
  modifiedBy?: number;
  modifiedDate?: Moment;
  uomProfileName?: string;
  distName?: string;
}

export class ItemMstDistPrices implements IItemMstDistPrices {
  constructor(
    public id?: string,
    public itemId?: string,
    public distId?: string,
    public wac?: number,
    public list?: number,
    public stdCost?: number,
    public amp?: number,
    public fss?: number,
    public usePriceForCalcFlag?: string,
    public uomProfile?: string,
    public createdBy?: number,
    public createdDate?: Moment,
    public modifiedBy?: number,
    public modifiedDate?: Moment,
    public uomProfileName?: string,
    public distName?: string
  ) {}
}
