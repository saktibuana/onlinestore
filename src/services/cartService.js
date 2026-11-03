import { analytics } from './analytics';
import { gtm } from './gtm';
import { criteo } from './criteo';
import { branchService } from './branch';

const CART_KEY = 'tokopedia_user_cart_v1';

class CartService {
  constructor() {
    this.subscribers = new Set();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === CART_KEY) {
          this.notify();
        }
      });
    }
  }

  getItems() {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveItems(items) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      this.notify();
    } catch (e) {
      console.error('Failed to save cart items:', e);
    }
  }

  addItem(product, quantity = 1, variant = null) {
    const items = this.getItems();
    const existingIndex = items.findIndex(
      (it) => it.id === product.id && it.selectedVariant === variant
    );

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        brand: product.brand,
        shop: product.shop,
        quantity,
        selectedVariant: variant,
        hasFreeShipping: product.hasFreeShipping
      });
    }

    this.saveItems(items);

    // Track in GA4, GTM, Criteo, Branch
    analytics.trackAddToCart(product, quantity);
    gtm.pushEvent('add_to_cart', {
      product_id: product.id,
      product_title: product.title,
      price: product.price,
      quantity,
      shop: product.shop?.name
    });
    criteo.trackViewBasket(items);
    branchService.logEvent('ADD_TO_CART', {
      product_id: product.id,
      price: product.price,
      quantity
    });
  }

  updateQuantity(itemId, variant, quantity) {
    let items = this.getItems();
    if (quantity <= 0) {
      items = items.filter((it) => !(it.id === itemId && it.selectedVariant === variant));
    } else {
      const target = items.find((it) => it.id === itemId && it.selectedVariant === variant);
      if (target) target.quantity = quantity;
    }
    this.saveItems(items);
  }

  removeItem(itemId, variant) {
    this.updateQuantity(itemId, variant, 0);
  }

  clearCart() {
    this.saveItems([]);
  }

  getCount() {
    return this.getItems().reduce((acc, it) => acc + (it.quantity || 1), 0);
  }

  getSubtotal() {
    return this.getItems().reduce((acc, it) => acc + (it.price * (it.quantity || 1)), 0);
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    const items = this.getItems();
    const count = this.getCount();
    this.subscribers.forEach((cb) => cb({ items, count }));
  }
}

export const cartService = new CartService();
