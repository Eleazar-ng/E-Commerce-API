export interface CreateProductRequest {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  isFeatured: boolean;
}