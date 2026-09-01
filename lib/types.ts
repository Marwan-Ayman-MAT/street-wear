export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductReview = {
  author: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  details: string[];
  price: number;
  salePrice?: number;
  category: string;
  categorySlug: string;
  images: string[];
  colors: ProductColor[];
  sizes: Size[];
  inventoryCount: number;
  sku: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestseller?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  tags: string[];
  reviews: ProductReview[];
};

export type Category = {
  name: string;
  slug: string;
  description: string;
  image: string;
};

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: Size;
  color: string;
  quantity: number;
  sku: string;
};

export type CheckoutQuote = {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};
