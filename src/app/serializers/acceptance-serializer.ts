export class AcceptanceSerializer {
  id: number;
  acceptance_number: string;
  acceptance_date: string;
  user: number;
  customer_name: string;
  customer_address: string;
  customer_phone: string;
  total: number;
  down_payment: number = 0;
  residual: number = 0;
  status: string;
  payment_status: string;
  attr_color_payment_status: string;
  attr_status: string;
}

export class AcceptancePaginateSerializer {
  previous: string;
  next: string;
  count: number;
  results: AcceptanceSerializer[];
}
