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
  product_photo: string;
  product_status: string;
  product_category: {
    id: string;
    product_category_name: string;
  };
}

export interface ProductsRequest {
  product_name: string;
  product_stock: string;
  product_price: string;
  product_description: string;
  product_variants: {}[];
  product_photo: string;
  productCategoryId: string;
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
  product_photo: string;
  product_status: string;
  product_category: {
    id: string;
    product_category_name: string;
  };
}

export interface AddProductToCartRequest {
  productId: string;
  selected_variant: string;
  quantity: number;
}

export interface AddProductToCartResponse {
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
