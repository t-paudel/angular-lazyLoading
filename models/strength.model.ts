export interface IStrength {
  id?: string;
  code?: number;
  description?: string;
}

export class Strength implements IStrength {
  constructor(public id?: string, public code?: number, public description?: string) {}
}
