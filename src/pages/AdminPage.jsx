import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  categories,
  createEmptyProduct,
  formatPrice,
  getDefaultVariant,
  getTotalStock,
  getVariantById,
} from '../data/products';
import './AdminPage.css';

const productSections = [
  { value: 'prepared', label: 'Prepared (Fried)' },
  { value: 'raw', label: 'Raw Material' },
];

const createInitialFormState = () => ({
  ...createEmptyProduct(),
  category: 'Namkeen',
  section: 'prepared',
  badge: 'New',
  variants: [
    { id: '500gm', label: '500gm', price: 0, stock: 0 },
    { id: '1kg', label: '1kg', price: 0, stock: 10 },
  ],
});

const toSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function AdminPage() {
  const { isAuthenticated, login, logout } = useAdminAuth();
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const [formState, setFormState] = useState(createInitialFormState);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;

    return products.filter((product) =>
      [product.name, product.category, product.badge, product.section]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }, [products, searchTerm]);

  const activeCount = products.filter((product) => product.isActive).length;
  const lowStockCount = products.filter((product) =>
    product.variants.some((variant) => variant.stock > 0 && variant.stock <= 10)
  ).length;
  const outOfStockCount = products.filter((product) => getTotalStock(product) === 0).length;

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleVariantFormChange = (variantId, field, value) => {
    setFormState((prev) => ({
      ...prev,
      variants: prev.variants.map((variant) =>
        variant.id === variantId
          ? { ...variant, [field]: field === 'price' || field === 'stock' ? Number(value) : value }
          : variant
      ),
    }));
  };

  const handleAddProduct = (event) => {
    event.preventDefault();

    const trimmedName = formState.name.trim();
    if (!trimmedName || !formState.img.trim()) {
      setStatusMessage('Please add at least a product name and image path.');
      return;
    }

    addProduct({
      ...formState,
      id: toSlug(trimmedName),
      name: trimmedName,
      desc: formState.desc.trim(),
      img: formState.img.trim(),
      badge: formState.badge.trim(),
      category: formState.category.trim(),
      variants: formState.variants.map((variant) => ({
        ...variant,
        price: Number(variant.price),
        stock: Number(variant.stock),
      })),
      tags: formState.tags
        .toString()
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    });

    setFormState(createInitialFormState());
    setStatusMessage(`Added "${trimmedName}" to the catalog.`);
  };

  const handleInlineChange = (productId, field, value) => {
    updateProduct(productId, { [field]: value });
  };

  const handleVariantInlineChange = (productId, variantId, field, value) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    const variants = product.variants.map((variant) =>
      variant.id === variantId
        ? { ...variant, [field]: field === 'price' || field === 'stock' ? Number(value) : value }
        : variant
    );

    updateProduct(productId, { variants });
  };

  const handleCredentialChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const result = login(credentials.username.trim(), credentials.password);

    if (!result.ok) {
      setAuthError(
        result.reason === 'missing-config'
          ? 'Admin credentials are not configured yet. Add VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD before going live.'
          : 'Incorrect username or password.'
      );
      return;
    }

    setAuthError('');
    setCredentials({ username: '', password: '' });
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page admin-login-page">
        <div className="admin-login-shell">
          <div className="admin-login-card">
            <p className="admin-eyebrow admin-login-eyebrow">Restricted Access</p>
            <h1>Admin login</h1>
            <p className="admin-login-copy">
              This page is only for catalog management. Sign in with your admin username and password.
            </p>

            <form className="admin-login-form" onSubmit={handleLogin}>
              <label>
                Username
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleCredentialChange}
                  autoComplete="username"
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleCredentialChange}
                  autoComplete="current-password"
                />
              </label>

              {authError && <p className="admin-auth-error">{authError}</p>}

              <div className="admin-login-actions">
                <button type="submit" className="admin-primary-btn">Sign in</button>
                <Link to="/products" className="admin-secondary-btn admin-link-btn">Back to products</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-hero">
        <div className="admin-hero-inner">
          <div>
            <p className="admin-eyebrow">Catalog Control</p>
            <h1>Admin dashboard for products, price, and stock</h1>
            <p className="admin-subtitle">
              Manage the full catalog from one place, keep prices current, pause products, and track inventory without touching code.
            </p>
          </div>
          <div className="admin-hero-actions">
            <Link to="/products" className="admin-hero-link">View storefront</Link>
            <button type="button" className="admin-hero-logout" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <section className="admin-stats">
          <div className="admin-stat-card">
            <span>Total products</span>
            <strong>{products.length}</strong>
          </div>
          <div className="admin-stat-card">
            <span>Live on store</span>
            <strong>{activeCount}</strong>
          </div>
          <div className="admin-stat-card">
            <span>Low stock</span>
            <strong>{lowStockCount}</strong>
          </div>
          <div className="admin-stat-card">
            <span>Out of stock</span>
            <strong>{outOfStockCount}</strong>
          </div>
        </section>

        <section className="admin-layout">
          <div className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <h2>Add new product</h2>
                <p>Create a new item with price, quantity, tags, image path, and store section.</p>
              </div>
            </div>

            <form className="admin-form" onSubmit={handleAddProduct}>
              <div className="admin-form-grid">
                <label>
                  Product name
                  <input name="name" value={formState.name} onChange={handleFormChange} placeholder="Ex. Methi Khakhra" />
                </label>
                <label>
                  Badge
                  <input name="badge" value={formState.badge} onChange={handleFormChange} placeholder="Ex. Bestseller" />
                </label>
                <label className="admin-form-full">
                  Description
                  <textarea name="desc" value={formState.desc} onChange={handleFormChange} rows="3" placeholder="Short product description" />
                </label>
                <label className="admin-form-full">
                  Image path
                  <input name="img" value={formState.img} onChange={handleFormChange} placeholder="/images/example.png" />
                </label>
                <label>
                  Category
                  <input name="category" list="product-categories" value={formState.category} onChange={handleFormChange} />
                </label>
                <label>
                  Section
                  <select name="section" value={formState.section} onChange={handleFormChange}>
                    {productSections.map((section) => (
                      <option key={section.value} value={section.value}>{section.label}</option>
                    ))}
                  </select>
                </label>
                <label className="admin-form-full">
                  Tags
                  <input name="tags" value={formState.tags} onChange={handleFormChange} placeholder="Crunchy, Handmade, Spicy" />
                </label>
                <div className="admin-form-full admin-variant-editor">
                  <span className="admin-variant-title">Pack sizes</span>
                  <div className="admin-variant-grid">
                    {formState.variants.map((variant) => (
                      <div key={variant.id} className="admin-variant-card">
                        <strong>{variant.label}</strong>
                        <label>
                          Price
                          <input
                            type="number"
                            min="0"
                            value={variant.price}
                            onChange={(event) => handleVariantFormChange(variant.id, 'price', event.target.value)}
                          />
                        </label>
                        <label>
                          Stock
                          <input
                            type="number"
                            min="0"
                            value={variant.stock}
                            onChange={(event) => handleVariantFormChange(variant.id, 'stock', event.target.value)}
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <label className="admin-toggle">
                  <input name="isActive" type="checkbox" checked={formState.isActive} onChange={handleFormChange} />
                  <span>Show on storefront</span>
                </label>
              </div>

              <datalist id="product-categories">
                {categories.filter((category) => category !== 'All').map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>

              <div className="admin-form-actions">
                <button type="submit" className="admin-primary-btn">Add product</button>
                <button type="button" className="admin-secondary-btn" onClick={() => setFormState(createInitialFormState())}>
                  Clear form
                </button>
              </div>

              {statusMessage && <p className="admin-status-message">{statusMessage}</p>}
            </form>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head admin-panel-head-split">
              <div>
                <h2>Manage existing products</h2>
                <p>Update any field inline. Changes are saved immediately in local storage.</p>
              </div>
              <button type="button" className="admin-secondary-btn" onClick={resetProducts}>
                Reset defaults
              </button>
            </div>

            <div className="admin-toolbar">
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by product, category, or badge"
              />
            </div>

            <div className="admin-product-list">
              {visibleProducts.map((product) => (
                <article key={product.id} className="admin-product-card">
                  {(() => {
                    const defaultVariant = getDefaultVariant(product);
                    const halfKgVariant = getVariantById(product, '500gm');
                    const oneKgVariant = getVariantById(product, '1kg');
                    const totalStock = getTotalStock(product);

                    return (
                      <>
                  <div className="admin-product-summary">
                    <img src={product.img} alt={product.name} />
                    <div>
                      <h3>{product.name}</h3>
                      <p>
                        {formatPrice(defaultVariant.price)} starting price
                        <span className="admin-summary-meta"> | 500gm {formatPrice(halfKgVariant.price)} | 1kg {formatPrice(oneKgVariant.price)}</span>
                      </p>
                      <span className={`admin-stock-state ${totalStock === 0 ? 'out' : totalStock <= 10 ? 'low' : 'ok'}`}>
                        {totalStock === 0 ? 'Out of stock' : totalStock <= 10 ? `Low stock: ${totalStock}` : `In stock: ${totalStock}`}
                      </span>
                    </div>
                  </div>

                  <div className="admin-product-fields">
                    <label>
                      Name
                      <input value={product.name} onChange={(event) => handleInlineChange(product.id, 'name', event.target.value)} />
                    </label>
                    <label>
                      Category
                      <input value={product.category} onChange={(event) => handleInlineChange(product.id, 'category', event.target.value)} />
                    </label>
                    <label>
                      Badge
                      <input value={product.badge} onChange={(event) => handleInlineChange(product.id, 'badge', event.target.value)} />
                    </label>
                    <label>
                      Section
                      <select value={product.section} onChange={(event) => handleInlineChange(product.id, 'section', event.target.value)}>
                        {productSections.map((section) => (
                          <option key={section.value} value={section.value}>{section.label}</option>
                        ))}
                      </select>
                    </label>
                    <label className="admin-toggle">
                      <input
                        type="checkbox"
                        checked={product.isActive}
                        onChange={(event) => handleInlineChange(product.id, 'isActive', event.target.checked)}
                      />
                      <span>Visible in store</span>
                    </label>
                    <label className="admin-product-full">
                      Description
                      <textarea value={product.desc} rows="3" onChange={(event) => handleInlineChange(product.id, 'desc', event.target.value)} />
                    </label>
                    <label className="admin-product-full">
                      Image path
                      <input value={product.img} onChange={(event) => handleInlineChange(product.id, 'img', event.target.value)} />
                    </label>
                    <label className="admin-product-full">
                      Tags
                      <input
                        value={product.tags.join(', ')}
                        onChange={(event) =>
                          handleInlineChange(
                            product.id,
                            'tags',
                            event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean)
                          )
                        }
                      />
                    </label>
                    <div className="admin-product-full admin-variant-editor">
                      <span className="admin-variant-title">Pack sizes</span>
                      <div className="admin-variant-grid">
                        {product.variants.map((variant) => (
                          <div key={variant.id} className="admin-variant-card">
                            <strong>{variant.label}</strong>
                            <label>
                              Price
                              <input
                                type="number"
                                min="0"
                                value={variant.price}
                                onChange={(event) => handleVariantInlineChange(product.id, variant.id, 'price', event.target.value)}
                              />
                            </label>
                            <label>
                              Stock
                              <input
                                type="number"
                                min="0"
                                value={variant.stock}
                                onChange={(event) => handleVariantInlineChange(product.id, variant.id, 'stock', event.target.value)}
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="admin-product-actions">
                    <button
                      type="button"
                      className="admin-danger-btn"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete product
                    </button>
                  </div>
                      </>
                    );
                  })()}
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
