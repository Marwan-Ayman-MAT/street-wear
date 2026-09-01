import type { Category, Product } from "@/lib/types";

export const categories: Category[] = [
  {
    name: "Outerwear",
    slug: "outerwear",
    description: "Structured jackets, puffers, overshirts, and weather-ready layers.",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Hoodies",
    slug: "hoodies",
    description: "Heavyweight fleece, cropped cuts, relaxed fits, and everyday staples.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Tees",
    slug: "tees",
    description: "Premium jersey, oversized silhouettes, washed tones, and graphic hits.",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Bottoms",
    slug: "bottoms",
    description: "Cargo trousers, technical joggers, denim, and tailored streetwear fits.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
  }
];

export const products: Product[] = [
  {
    id: "prd-001",
    slug: "origin-heavyweight-hoodie",
    name: "Origin Heavyweight Hoodie",
    description:
      "A dense 480 GSM fleece hoodie with a sculpted drop shoulder, double-layer hood, and brushed interior built for daily rotation.",
    details: [
      "480 GSM cotton blend fleece",
      "Double-layer hood with matte black aglets",
      "Oversized body with structured ribbed hem",
      "Pre-washed to reduce shrinkage"
    ],
    price: 118,
    salePrice: 94,
    category: "Hoodies",
    categorySlug: "hoodies",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?auto=format&fit=crop&w=1400&q=85"
    ],
    colors: [
      { name: "Washed Black", hex: "#1c1c1c" },
      { name: "Bone", hex: "#ddd7ca" },
      { name: "Deep Olive", hex: "#3b4432" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inventoryCount: 74,
    sku: "SW-HD-ORIGIN-001",
    rating: 4.8,
    reviewCount: 128,
    featured: true,
    bestseller: true,
    newArrival: true,
    tags: ["fleece", "oversized", "unisex"],
    reviews: [
      {
        author: "Maya A.",
        rating: 5,
        title: "Premium weight without feeling stiff",
        body: "The fit is boxy in the right way and the hood keeps its shape. It looks expensive with cargos or denim.",
        createdAt: "2026-04-18"
      },
      {
        author: "Jon R.",
        rating: 5,
        title: "Best hoodie in my rotation",
        body: "Heavy, warm, clean branding. I sized down for a sharper fit and it still drapes well.",
        createdAt: "2026-03-22"
      }
    ]
  },
  {
    id: "prd-002",
    slug: "utility-cargo-trouser",
    name: "Utility Cargo Trouser",
    description:
      "A tapered cargo trouser made from cotton ripstop with articulated knees, secure pockets, and a clean street-luxury finish.",
    details: [
      "Cotton ripstop with light stretch",
      "Six functional pockets with hidden snaps",
      "Adjustable ankle tabs",
      "Relaxed thigh with tapered leg"
    ],
    price: 132,
    category: "Bottoms",
    categorySlug: "bottoms",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85"
    ],
    colors: [
      { name: "Graphite", hex: "#2b2b2b" },
      { name: "Sand", hex: "#b6a68e" },
      { name: "Army Green", hex: "#4a513f" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inventoryCount: 46,
    sku: "SW-BT-UTILITY-002",
    rating: 4.7,
    reviewCount: 86,
    featured: true,
    trending: true,
    tags: ["cargo", "ripstop", "technical"],
    reviews: [
      {
        author: "Sam K.",
        rating: 5,
        title: "Pocket layout is actually useful",
        body: "A rare cargo that looks clean enough for dinner but still handles travel days.",
        createdAt: "2026-05-02"
      }
    ]
  },
  {
    id: "prd-003",
    slug: "monolith-box-tee",
    name: "Monolith Box Tee",
    description:
      "A heavyweight box-fit tee with a compact neckline, dense cotton jersey, and subtle raised STREET WEAR mark at the hem.",
    details: [
      "300 GSM cotton jersey",
      "Box fit with slightly cropped length",
      "Enzyme washed for a soft hand feel",
      "Raised silicone hem mark"
    ],
    price: 62,
    category: "Tees",
    categorySlug: "tees",
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=85"
    ],
    colors: [
      { name: "White", hex: "#f7f7f2" },
      { name: "Black", hex: "#111111" },
      { name: "Ash Grey", hex: "#a7a7a7" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inventoryCount: 120,
    sku: "SW-TE-MONOLITH-003",
    rating: 4.9,
    reviewCount: 214,
    bestseller: true,
    tags: ["tee", "heavyweight", "minimal"],
    reviews: [
      {
        author: "Lina D.",
        rating: 5,
        title: "Perfect neckline",
        body: "The collar does not warp after washing and the crop works well with high-waist denim.",
        createdAt: "2026-04-09"
      }
    ]
  },
  {
    id: "prd-004",
    slug: "apex-shell-jacket",
    name: "Apex Shell Jacket",
    description:
      "A lightweight water-resistant shell with a matte finish, packable hood, and sculpted paneling for all-season layering.",
    details: [
      "Water-resistant nylon shell",
      "Two-way zipper with storm flap",
      "Packable hood in collar",
      "Hidden internal phone pocket"
    ],
    price: 186,
    salePrice: 158,
    category: "Outerwear",
    categorySlug: "outerwear",
    images: [
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85"
    ],
    colors: [
      { name: "Black", hex: "#0d0d0d" },
      { name: "Steel", hex: "#73777a" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inventoryCount: 38,
    sku: "SW-OW-APEX-004",
    rating: 4.6,
    reviewCount: 64,
    featured: true,
    trending: true,
    tags: ["outerwear", "water-resistant", "technical"],
    reviews: [
      {
        author: "Nour E.",
        rating: 4,
        title: "Cleanest shell I own",
        body: "Great for windy nights. The matte finish looks much more premium than a regular rain jacket.",
        createdAt: "2026-02-14"
      }
    ]
  },
  {
    id: "prd-005",
    slug: "studio-cropped-sweatshirt",
    name: "Studio Cropped Sweatshirt",
    description:
      "A cropped fleece sweatshirt with dropped sleeves, compact cuffs, and a tailored streetwear silhouette.",
    details: [
      "420 GSM fleece",
      "Cropped waist length",
      "Dropped sleeve with structured cuff",
      "Tonal chest embroidery"
    ],
    price: 96,
    category: "Hoodies",
    categorySlug: "hoodies",
    images: [
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85"
    ],
    colors: [
      { name: "Oat", hex: "#d4c8b4" },
      { name: "Washed Charcoal", hex: "#343434" },
      { name: "Burgundy", hex: "#5e1f2f" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inventoryCount: 59,
    sku: "SW-HD-STUDIO-005",
    rating: 4.7,
    reviewCount: 73,
    newArrival: true,
    tags: ["cropped", "fleece", "women"],
    reviews: [
      {
        author: "Farah M.",
        rating: 5,
        title: "Polished and easy",
        body: "Feels like a sweatshirt but styles like a jacket. The sleeves are my favorite part.",
        createdAt: "2026-05-11"
      }
    ]
  },
  {
    id: "prd-006",
    slug: "compressed-training-tee",
    name: "Compressed Training Tee",
    description:
      "A performance streetwear tee with breathable compression panels, anti-odor finish, and a sharp athletic cut.",
    details: [
      "Moisture-wicking recycled nylon blend",
      "Compression side panels",
      "Anti-odor finish",
      "Reflective back neck detail"
    ],
    price: 72,
    category: "Tees",
    categorySlug: "tees",
    images: [
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1400&q=85"
    ],
    colors: [
      { name: "Black", hex: "#0f0f0f" },
      { name: "Ice", hex: "#dce8ea" },
      { name: "Volt", hex: "#b9ff39" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inventoryCount: 88,
    sku: "SW-TE-TRAIN-006",
    rating: 4.5,
    reviewCount: 51,
    trending: true,
    tags: ["training", "performance", "gym"],
    reviews: [
      {
        author: "Omar H.",
        rating: 4,
        title: "Gym-ready but still sharp",
        body: "Does not cling awkwardly after training and looks good under a shell jacket.",
        createdAt: "2026-04-28"
      }
    ]
  },
  {
    id: "prd-007",
    slug: "night-market-denim",
    name: "Night Market Denim",
    description:
      "A straight-leg black denim with washed highs, reinforced pockets, and a structured silhouette inspired by late-night city uniforms.",
    details: [
      "13 oz cotton denim",
      "Straight leg with stacked hem",
      "Reinforced front pocket bags",
      "Custom matte hardware"
    ],
    price: 148,
    category: "Bottoms",
    categorySlug: "bottoms",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85"
    ],
    colors: [
      { name: "Vintage Black", hex: "#242424" },
      { name: "Deep Indigo", hex: "#182637" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inventoryCount: 31,
    sku: "SW-BT-DENIM-007",
    rating: 4.8,
    reviewCount: 93,
    bestseller: true,
    tags: ["denim", "straight-leg", "black"],
    reviews: [
      {
        author: "Alex C.",
        rating: 5,
        title: "Finally, denim with structure",
        body: "The leg shape is clean and the wash looks intentional, not faded out.",
        createdAt: "2026-01-29"
      }
    ]
  },
  {
    id: "prd-008",
    slug: "metro-puffer-vest",
    name: "Metro Puffer Vest",
    description:
      "A cropped insulated vest with matte nylon, thermal fill, and minimal branding for layering over hoodies and tees.",
    details: [
      "Recycled thermal insulation",
      "Cropped unisex fit",
      "Two-way zipper",
      "Fleece-lined hand pockets"
    ],
    price: 164,
    salePrice: 139,
    category: "Outerwear",
    categorySlug: "outerwear",
    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1400&q=85"
    ],
    colors: [
      { name: "Black", hex: "#0b0b0b" },
      { name: "Smoke", hex: "#8a8f91" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inventoryCount: 24,
    sku: "SW-OW-METRO-008",
    rating: 4.7,
    reviewCount: 42,
    featured: true,
    tags: ["puffer", "vest", "layering"],
    reviews: [
      {
        author: "Yara S.",
        rating: 5,
        title: "Layering piece with attitude",
        body: "Warm enough for Cairo winter nights and the cropped length makes outfits look styled.",
        createdAt: "2026-02-08"
      }
    ]
  }
];

export const testimonials = [
  {
    quote:
      "STREET WEAR nails the balance between gym-ready comfort and sharp city styling. My reorder rate is getting dangerous.",
    name: "Nadine F.",
    role: "Creative Director"
  },
  {
    quote:
      "The fits feel premium in person. Heavy fabrics, clean hardware, and no loud branding fighting the outfit.",
    name: "Kareem A.",
    role: "Stylist"
  },
  {
    quote:
      "Fast delivery, clear sizing, and the product pages actually helped me choose the right fit the first time.",
    name: "Laila T.",
    role: "Verified Buyer"
  }
];

export const instagramShots = [
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85"
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter(
      (candidate) =>
        candidate.id !== product.id &&
        (candidate.categorySlug === product.categorySlug ||
          candidate.tags.some((tag) => product.tags.includes(tag)))
    )
    .slice(0, limit);
}

export function getProductFilters() {
  const colors = Array.from(
    new Map(
      products.flatMap((product) =>
        product.colors.map((color) => [color.name, color] as const)
      )
    ).values()
  );

  return {
    categories,
    colors,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"] as const,
    maxPrice: Math.max(...products.map((product) => product.salePrice ?? product.price))
  };
}
