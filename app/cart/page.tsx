import type { Metadata } from "next";
import { CartClient } from "@/components/commerce/CartClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your STREET WEAR shopping bag, apply coupons, and estimate shipping."
};

export default function CartPage() {
  return <CartClient />;
}
