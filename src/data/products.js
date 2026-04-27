const createVariants = (oneKgPrice, oneKgStock) => {
  const kgPrice = Number(oneKgPrice || 0);
  const kgStock = Number(oneKgStock || 0);

  return [
    {
      id: '500gm',
      label: '500gm',
      price: Math.round(kgPrice / 2),
      stock: Math.max(0, Math.round(kgStock / 2)),
    },
    {
      id: '1kg',
      label: '1kg',
      price: kgPrice,
      stock: Math.max(0, kgStock),
    },
  ];
};

export const initialProducts = [
  {
    id: 'bataka-wafer-raw',
    name: 'Bataka ni Wafer (Raw)',
    desc: 'Paper-thin raw potato wafers. Ready to fry for a fresh, crispy snack.',
    img: '/raw_materials/bataka_wafer_raw.png',
    badge: 'Raw Material',
    tags: ['Ready to Fry', 'Pure'],
    category: 'Chips',
    section: 'raw',
    variants: createVariants(150, 40),
    isActive: true,
  },
  {
    id: 'gau-sev-raw',
    name: 'Gau ni Sev (Raw)',
    desc: 'Traditional wheat sev raw material. Fry at home for authentic crunch.',
    img: '/raw_materials/gau_sev_raw.png',
    badge: 'Traditional',
    tags: ['Wheat', 'Classic'],
    category: 'Papad',
    section: 'raw',
    variants: createVariants(150, 35),
    isActive: true,
  },
  {
    id: 'kanchi-papad-raw',
    name: 'Kanchi Papad',
    desc: 'Sun-dried raw papad made with farm-fresh ingredients.',
    img: '/raw_materials/kanchi_papad_raw.png',
    badge: 'Most Popular',
    tags: ['Sun-dried', 'Pure'],
    category: 'Papad',
    section: 'raw',
    variants: createVariants(170, 28),
    isActive: true,
  },
  {
    id: 'sabudana-vadi-raw',
    name: 'Sabudana Vadi (Raw)',
    desc: 'Sago vadi raw material. Perfect for fasting days when fried fresh.',
    img: '/raw_materials/sabudana_vadi_raw.png',
    badge: 'Fasting Special',
    tags: ['Fasting', 'Crispy'],
    category: 'Fasting',
    section: 'raw',
    variants: createVariants(180, 20),
    isActive: true,
  },
  {
    id: 'nylon-poha-chevdo',
    name: 'Nylon Poha Chevdo',
    desc: 'Crispy, sweet, and tangy roasted poha chevdo mixed with nuts.',
    img: '/fried/chevado.png',
    badge: 'Bestseller',
    tags: ['Crunchy', 'Prepared'],
    category: 'Namkeen',
    section: 'prepared',
    variants: createVariants(200, 24),
    isActive: true,
  },
  {
    id: 'farsi-puri',
    name: 'Farsi Puri',
    desc: 'Crispy and flaky Gujarati savory flatbread snack, fried to perfection.',
    img: '/fried/farsi_puri.png',
    badge: 'Traditional',
    tags: ['Crispy', 'Prepared'],
    category: 'Namkeen',
    section: 'prepared',
    variants: createVariants(250, 18),
    isActive: true,
  },
  {
    id: 'masala-khakhra',
    name: 'Masala Khakhra',
    desc: 'Roasted thin flatbread infused with aromatic spices.',
    img: '/fried/khakhara_photo.png',
    badge: 'Healthy Snack',
    tags: ['Handmade', 'Roasted'],
    category: 'Namkeen',
    section: 'prepared',
    variants: createVariants(200, 26),
    isActive: true,
  },
  {
    id: 'shakkarpara-normal',
    name: 'Shakkarpara (Normal)',
    desc: 'Savory fried diamond shapes with a hint of salt and spices.',
    img: '/fried/shakkar_para.png',
    badge: 'Classic',
    tags: ['Fried', 'Crunchy'],
    category: 'Namkeen',
    section: 'prepared',
    variants: createVariants(200, 22),
    isActive: true,
  },
  {
    id: 'shakkarpara-sweet',
    name: 'Shakkarpara (Sweet)',
    desc: 'Sweet, crispy, and bite-sized delights with sugar coating.',
    img: '/fried/shakkar_para_sweet.png',
    badge: 'Sweet Treat',
    tags: ['Sweet', 'Fried'],
    category: 'Sweet',
    section: 'prepared',
    variants: createVariants(250, 16),
    isActive: true,
  },
];

export const categories = ['All', 'Namkeen', 'Papad', 'Fasting', 'Chips', 'Sweet'];

export const defaultVariantOptions = [
  { id: '500gm', label: '500gm', price: 0, stock: 0 },
  { id: '1kg', label: '1kg', price: 0, stock: 0 },
];

export const formatPrice = (value) => `₹${Number(value || 0)}`;

export const normalizeVariants = (variants = [], fallbackPrice = 0, fallbackStock = 0) => {
  if (Array.isArray(variants) && variants.length > 0) {
    return variants.map((variant, index) => ({
      id: variant.id || defaultVariantOptions[index]?.id || `variant-${index + 1}`,
      label: variant.label || defaultVariantOptions[index]?.label || `Variant ${index + 1}`,
      price: Math.max(0, Number(variant.price || 0)),
      stock: Math.max(0, Number(variant.stock || 0)),
    }));
  }

  return createVariants(fallbackPrice, fallbackStock);
};

export const getDefaultVariant = (product) => product.variants?.[0] || defaultVariantOptions[0];

export const getVariantById = (product, variantId) =>
  product.variants?.find((variant) => variant.id === variantId) || getDefaultVariant(product);

export const getTotalStock = (product) =>
  (product.variants || []).reduce((total, variant) => total + Number(variant.stock || 0), 0);

export const createEmptyProduct = () => ({
  id: '',
  name: '',
  desc: '',
  img: '',
  badge: '',
  tags: [],
  category: 'Namkeen',
  section: 'prepared',
  variants: defaultVariantOptions,
  isActive: true,
});
