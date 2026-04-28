import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createEmptyProduct, initialProducts, normalizeVariants } from '../data/products';
import {
  createImageKey,
  deleteStoredImage,
  isInlineImageData,
  isStoredImageRef,
  loadStoredImageUrl,
  saveDataUrlImage,
} from '../utils/imageStorage';

const ProductContext = createContext();
const STORAGE_KEY = 'village_products';

const normalizeProduct = (product) => ({
  ...createEmptyProduct(),
  ...product,
  tags: Array.isArray(product.tags) ? product.tags : [],
  variants: normalizeVariants(product.variants, product.price, product.stock),
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
  const [imageSrcMap, setImageSrcMap] = useState({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error('Unable to save products to local storage.', error);
    }
  }, [products]);

  useEffect(() => {
    const inlineImages = products.filter((product) => isInlineImageData(product.img));
    if (inlineImages.length === 0) return undefined;

    let cancelled = false;

    const migrateInlineImages = async () => {
      const migratedEntries = await Promise.all(
        inlineImages.map(async (product) => ({
          id: product.id,
          previousImg: product.img,
          nextImg: await saveDataUrlImage(product.img, createImageKey(product.id || 'product', 'migrated-image')),
        }))
      );

      if (cancelled) return;

      setProducts((prev) =>
        prev.map((product) => {
          const migrated = migratedEntries.find(
            (entry) => entry.id === product.id && entry.previousImg === product.img
          );

          return migrated ? normalizeProduct({ ...product, img: migrated.nextImg }) : product;
        })
      );
    };

    migrateInlineImages().catch((error) => {
      console.error('Unable to migrate inline product images.', error);
    });

    return () => {
      cancelled = true;
    };
  }, [products]);

  useEffect(() => {
    const storedRefs = [...new Set(products.map((product) => product.img).filter(isStoredImageRef))];
    if (storedRefs.length === 0) {
      setImageSrcMap({});
      return undefined;
    }

    let cancelled = false;
    let generatedUrls = [];

    const loadImages = async () => {
      const loadedEntries = await Promise.all(
        storedRefs.map(async (ref) => {
          const url = await loadStoredImageUrl(ref);
          return [ref, url];
        })
      );

      if (cancelled) {
        loadedEntries.forEach(([, url]) => {
          if (url && url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
          }
        });
        return;
      }

      generatedUrls = loadedEntries
        .map(([, url]) => url)
        .filter((url) => typeof url === 'string' && url.startsWith('blob:'));

      setImageSrcMap(
        Object.fromEntries(
          loadedEntries.filter(([, url]) => Boolean(url))
        )
      );
    };

    loadImages().catch((error) => {
      console.error('Unable to load stored product images.', error);
      setImageSrcMap({});
    });

    return () => {
      cancelled = true;
      generatedUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [products]);

  const addProduct = (product) => {
    const productId = product.id?.trim() || `product-${Date.now()}`;
    setProducts((prev) => [...prev, normalizeProduct({ ...product, id: productId })]);
  };

  const updateProduct = (id, changes) => {
    const currentProduct = products.find((product) => product.id === id);

    if (
      Object.prototype.hasOwnProperty.call(changes, 'img') &&
      currentProduct?.img &&
      currentProduct.img !== changes.img &&
      isStoredImageRef(currentProduct.img)
    ) {
      deleteStoredImage(currentProduct.img).catch((error) => {
        console.error('Unable to clean up the previous product image.', error);
      });
    }

    setProducts((prev) =>
      prev.map((product) => (product.id === id ? normalizeProduct({ ...product, ...changes }) : product))
    );
  };

  const deleteProduct = (id) => {
    const currentProduct = products.find((product) => product.id === id);

    if (currentProduct?.img && isStoredImageRef(currentProduct.img)) {
      deleteStoredImage(currentProduct.img).catch((error) => {
        console.error('Unable to delete the product image.', error);
      });
    }

    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const resetProducts = () => {
    products
      .filter((product) => isStoredImageRef(product.img))
      .forEach((product) => {
        deleteStoredImage(product.img).catch((error) => {
          console.error('Unable to reset a stored product image.', error);
        });
      });

    setProducts(initialProducts);
  };

  const getImageSrc = (imageValue) => {
    if (isStoredImageRef(imageValue)) {
      return imageSrcMap[imageValue] || '';
    }

    return imageValue;
  };

  const value = useMemo(
    () => ({
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      resetProducts,
      getImageSrc,
    }),
    [products, imageSrcMap]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export const useProducts = () => useContext(ProductContext);
