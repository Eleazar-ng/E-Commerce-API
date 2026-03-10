export interface CreateProductRequest {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  isFeatured: boolean;
}

export interface ProductRequest {
  page: string;
  limit: string;
  sort: string;
  search: string;
}