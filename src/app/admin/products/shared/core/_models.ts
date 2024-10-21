export interface ProductsType {
  id: string;
  product_name: string;
  product_code: string;
  product_stock: string;
  product_price: number;
  product_description: string;
  product_variants: {
    variant: string;
  }[];
  product_photos: {
    filename: string;
  }[];
  product_status: string;
  product_category: {
    id: string;
    product_category_name: string;
  };
}

export interface ProductsResponse {
  id: string;
  product_name: string;
  product_code: string;
  product_stock: string;
  product_price: number;
  product_description: string;
  product_variants: {
    variant: string;
  }[];
  product_photos: {
    filename: string;
  }[];
  product_status: string;
  product_category: {
    id: string;
    product_category_name: string;
  };
}
