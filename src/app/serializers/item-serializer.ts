export class ItemSerializer {
  acceptance: number;
  acceptance_number: string;
  product: number;
  product_number: string;
  product_name: string;
  quantity: number;
  unit: string;
  price: number;
  sub_total: number;
}


export class ItemPaginateSerializer {
  previous: string;
  next: string;
  count: number = 0;
  results: ItemSerializer[]
}