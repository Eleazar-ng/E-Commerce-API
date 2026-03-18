export interface CreateProductRequest {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  isFeatured: boolean;
}

export interface ProductsRequest {
  page: string;
  limit: string;
  sort: string;
  search: string;
}

export interface ProductRequest {
  id: string;
}

export interface ProductImageRequest {
  ids: string[];
}