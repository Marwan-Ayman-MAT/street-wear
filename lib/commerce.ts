import type { CartLine, CheckoutQuote, Product, Size } from "@/lib/types";

export const freeShippingThreshold = 175;
export const standardShipping = 12;
export const expressShipping = 24;
export const taxRate = 0.0825;

export function productPrice(product: Product) {
  return product.salePrice ?? product.price;
}

export function buildCartLine(
  product: Product,
  options: { size: Size; color: string; quantity?: number }
): CartLine {
  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.images[0],
    price: productPrice(product),
    size: options.size,
    color: options.color,
    quantity: options.quantity ?? 1,
    sku: product.sku
  };
}

export function calculateQuote(
  lines: CartLine[],
  couponCode?: string,
  delivery: "standard" | "express" = "standard"
): CheckoutQuote {
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const coupon = couponCode?.trim().toUpperCase();
  const discount = coupon === "STREET15" ? subtotal * 0.15 : coupon === "DROP25" ? 25 : 0;
  const shipping =
    subtotal - discount >= freeShippingThreshold
      ? 0
      : delivery === "express"
        ? expressShipping
        : standardShipping;
  const tax = (subtotal - discount) * taxRate;

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total: Math.max(subtotal - discount + shipping + tax, 0)
  };
}

export function stockLabel(count: number) {
  if (count <= 0) return "Sold out";
  if (count < 20) return `Only ${count} left`;
  return "In stock";
}
