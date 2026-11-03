/**
 * Google Analytics 4 (GA4) Enhanced E-Commerce Service
 * Matches Tokopedia's GA4 measurement protocol & tracking architecture
 */

class AnalyticsService {
  constructor() {
    this.measurementId = 'G-TKPD4892GA4';
    this.logs = [];
    this.subscribers = new Set();
    this.init();
  }

  init() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', this.measurementId, {
      send_page_view: true,
      debug_mode: true
    });

    this.logEvent('page_view', {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title
    });
  }

  logEvent(eventName, params = {}) {
    const entry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString(),
      eventName,
      params
    };
    this.logs.unshift(entry);
    if (this.logs.length > 50) this.logs.pop();

    if (window.gtag) {
      window.gtag('event', eventName, params);
    }

    this.notify();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach((cb) => cb(this.getLogs()));
  }

  getLogs() {
    return [...this.logs];
  }

  trackPageView(pageTitle) {
    this.logEvent('page_view', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }

  // --- E-COMMERCE GA4 HELPERS ---

  trackViewItemList(items, listName = 'Rekomendasi Untuk Anda') {
    this.logEvent('view_item_list', {
      item_list_id: listName.toLowerCase().replace(/\s+/g, '_'),
      item_list_name: listName,
      items: items.slice(0, 10).map((it, idx) => ({
        item_id: it.id,
        item_name: it.title,
        affiliation: it.shop?.name || 'Tokopedia Official',
        discount: it.originalPrice ? it.originalPrice - it.price : 0,
        index: idx,
        item_brand: it.brand || 'Tokopedia',
        item_category: it.category || 'General',
        price: it.price,
        quantity: 1
      }))
    });
  }

  trackSelectItem(item, listName = 'Rekomendasi Untuk Anda') {
    this.logEvent('select_item', {
      item_list_id: listName.toLowerCase().replace(/\s+/g, '_'),
      item_list_name: listName,
      items: [{
        item_id: item.id,
        item_name: item.title,
        price: item.price,
        item_category: item.category
      }]
    });
  }

  trackViewItem(item) {
    this.logEvent('view_item', {
      currency: 'IDR',
      value: item.price,
      items: [{
        item_id: item.id,
        item_name: item.title,
        price: item.price,
        item_category: item.category,
        item_brand: item.brand,
        quantity: 1
      }]
    });
  }

  trackAddToCart(item, quantity = 1) {
    this.logEvent('add_to_cart', {
      currency: 'IDR',
      value: item.price * quantity,
      items: [{
        item_id: item.id,
        item_name: item.title,
        price: item.price,
        item_category: item.category,
        quantity
      }]
    });
  }

  trackViewCart(items, subtotal) {
    this.logEvent('view_cart', {
      currency: 'IDR',
      value: subtotal,
      items: items.map((it) => ({
        item_id: it.id,
        item_name: it.title,
        price: it.price,
        quantity: it.quantity
      }))
    });
  }

  trackBeginCheckout(items, total) {
    this.logEvent('begin_checkout', {
      currency: 'IDR',
      value: total,
      items: items.map((it) => ({
        item_id: it.id,
        item_name: it.title,
        price: it.price,
        quantity: it.quantity
      }))
    });
  }

  trackPurchase({ transactionId, items, value, shipping = 0, promo = 0 }) {
    this.logEvent('purchase', {
      transaction_id: transactionId,
      currency: 'IDR',
      value,
      shipping,
      coupon: promo > 0 ? 'HEMAT90' : undefined,
      items: items.map((it) => ({
        item_id: it.id,
        item_name: it.title,
        price: it.price,
        quantity: it.quantity
      }))
    });
  }

  trackSearch(searchTerm, resultCount) {
    this.logEvent('search', {
      search_term: searchTerm,
      result_count: resultCount
    });
  }
}

export const analytics = new AnalyticsService();
