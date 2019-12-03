export interface IUom {
  id?: string;
  code?: number;
  description?: string;
}

export class Uom implements IUom {
  constructor(public id?: string, public code?: number, public description?: string) {}
}
