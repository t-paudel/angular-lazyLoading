export interface IItemStatus {
  id?: string;
  code?: number;
  description?: string;
}

export class ItemStatus implements IItemStatus {
  constructor(public id?: string, public code?: number, public description?: string) {}
}
