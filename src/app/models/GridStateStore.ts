import {Product} from './Product';

export enum Views {
  list = "list",
  grid = "grid"
}

export interface Grid {
  items: Product[];
  viewIndex: number,
  currentItem?: Product
}

