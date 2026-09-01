"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { calculateQuote } from "@/lib/commerce";
import type { CartLine } from "@/lib/types";

type CartContextValue = {
  lines: CartLine[];
  wishlist: string[];
  recentlyViewed: string[];
  couponCode: string;
  addLine: (line: CartLine) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  trackRecentlyViewed: (slug: string) => void;
  setCouponCode: (code: string) => void;
  lineKey: (line: Pick<CartLine, "productId" | "size" | "color">) => string;
  itemCount: number;
  quote: ReturnType<typeof calculateQuote>;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "street-wear-commerce";

function makeLineKey(line: Pick<CartLine, "productId" | "size" | "color">) {
  return `${line.productId}:${line.size}:${line.color}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as {
          lines?: CartLine[];
          wishlist?: string[];
          recentlyViewed?: string[];
          couponCode?: string;
        };
        setLines(parsed.lines ?? []);
        setWishlist(parsed.wishlist ?? []);
        setRecentlyViewed(parsed.recentlyViewed ?? []);
        setCouponCode(parsed.couponCode ?? "");
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ lines, wishlist, recentlyViewed, couponCode })
    );
  }, [couponCode, hydrated, lines, recentlyViewed, wishlist]);

  const addLine = useCallback((line: CartLine) => {
    setLines((current) => {
      const key = makeLineKey(line);
      const existing = current.find((item) => makeLineKey(item) === key);
      if (!existing) return [...current, line];
      return current.map((item) =>
        makeLineKey(item) === key
          ? { ...item, quantity: Math.min(item.quantity + line.quantity, 10) }
          : item
      );
    });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setLines((current) =>
      current
        .map((line) =>
          makeLineKey(line) === key ? { ...line, quantity: Math.max(1, quantity) } : line
        )
        .filter((line) => line.quantity > 0)
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((current) => current.filter((line) => makeLineKey(line) !== key));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  }, []);

  const trackRecentlyViewed = useCallback((slug: string) => {
    setRecentlyViewed((current) => [slug, ...current.filter((item) => item !== slug)].slice(0, 8));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
    return {
      lines,
      wishlist,
      recentlyViewed,
      couponCode,
      addLine,
      updateQuantity,
      removeLine,
      clearCart,
      toggleWishlist,
      trackRecentlyViewed,
      setCouponCode,
      lineKey: makeLineKey,
      itemCount,
      quote: calculateQuote(lines, couponCode)
    };
  }, [
    addLine,
    clearCart,
    couponCode,
    lines,
    recentlyViewed,
    removeLine,
    toggleWishlist,
    trackRecentlyViewed,
    updateQuantity,
    wishlist
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
