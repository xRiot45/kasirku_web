export interface ICheckout {
  id: string;
  invoice: string;
  total_order_price: number;
  checkout_date: Date;
  payment_amount: number;
  change_returned: number;
  order_status: string;
  payment_method: string;
  seat_number: string;
  orders: {
    id: string;
    product: {
      id: string;
      product_name: string;
      product_code: string;
      product_price: number;
      product_photo: string;
      product_category: {
        id: string;
        product_category_name: string;
      };
    };
    selected_variant: string;
    quantity: number;
    total_price: number;
  }[];
}
