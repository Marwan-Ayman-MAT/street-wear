"use client";

import { CartProvider } from "@/components/commerce/CartProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
