import type { Metadata } from "next";
import { CheckoutClient } from "@/components/commerce/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout with address, delivery, Stripe, Paymob, and order summary flows."
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
