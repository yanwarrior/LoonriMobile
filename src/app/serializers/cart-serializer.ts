export class CartSerializer {
  id: number;
  user: number;
  product: number;
  quantity: number;
  name: string;
  product_number: string;
  total: number; 
  price: number;
}


export class CartPaginateSerializer {
  previous: string;
  next: string;
  count: number;
  results: CartSerializer[];
}