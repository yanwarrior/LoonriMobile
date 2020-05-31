import { ProductSerializer } from './product-serializer';

export interface ProductPaginateSerializer {
  next: string;
  count: number;
  previous: string;
  results: ProductSerializer[];
}
