export interface IAddProductToCartRequest {
  productId: string;
  selected_variant: string;
  quantity: number;
}

export interface ICarts {
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
}
