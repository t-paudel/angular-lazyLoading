export interface IItemclass {
  id?: string;
  code?: number;
  description?: string;
}

export class Itemclass implements IItemclass {
  constructor(public id?: string, public code?: number, public description?: string) {}
}
