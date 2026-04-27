import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createEmptyProduct, initialProducts } from '../data/products';

const ProductContext = createContext();
const STORAGE_KEY = 'village_products';

const normalizeProduct = (product) => ({
  ...createEmptyProduct(),
  ...product,
  price: Number(product.price || 0),
  stock: Math.max(0, Number(product.stock || 0)),
  tags: Array.isArray(product.tags) ? product.tags : [],
  isActive: product.isActive !== false,
});

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialProducts;

    try {
      const parsed = JSON.parse(saved);
      return parsed.map(normalizeProduct);
    } catch (error) {
      return initialProducts;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const productId = product.id?.trim() || `product-${Date.now()}`;
    setProducts((prev) => [...prev, normalizeProduct({ ...product, id: productId })]);
  };

  const updateProduct = (id, changes) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? normalizeProduct({ ...product, ...changes }) : product))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const resetProducts = () => {
    setProducts(initialProducts);
  };

  const value = useMemo(
    () => ({
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      resetProducts,
    }),
    [products]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export const useProducts = () => useContext(ProductContext);
