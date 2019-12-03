export interface IItemType {
  id?: string;
  code?: number;
  description?: string;
}

export class ItemType implements IItemType {
  constructor(public id?: string, public code?: number, public description?: string) {}
}
