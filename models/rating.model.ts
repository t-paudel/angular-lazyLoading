export interface IRating {
  id?: string;
  code?: number;
  description?: string;
}

export class Rating implements IRating {
  constructor(public id?: string, public code?: number, public description?: string) {}
}
