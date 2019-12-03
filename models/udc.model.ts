export interface IUdc {
  id?: string;
  code?: number;
  description?: string;
  type?: string;
}

export class Udc implements IUdc {
  constructor(public id?: string, public code?: number, public description?: string, public type?: string) {}
}
