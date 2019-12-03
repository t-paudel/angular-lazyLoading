export interface IItemformType {
  id?: string;
  code?: number;
  description?: string;
}

export class ItemformType implements IItemformType {
  constructor(public id?: string, public code?: number, public description?: string) {}
}
