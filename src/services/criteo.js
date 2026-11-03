/**
 * Criteo OneTag Retargeting Integration
 * Simulates Criteo dynamic product ads & retargeting tags used by Tokopedia
 */

class CriteoService {
  constructor() {
    this.partnerId = 104829; // Tokopedia Criteo Partner ID
    this.siteType = 'd'; // Desktop ('d', 'm', 't')
    this.userEmailHash = 'ce7382103f0b2f';
    this.logs = [];
    this.subscribers = new Set();
    this.init();
  }

  init() {
    window.criteo_q = window.criteo_q || [];

    // Base Account Configuration
    this.pushTag({ event: 'setAccount', account: this.partnerId });
    this.pushTag({ event: 'setSiteType', type: this.siteType });
    this.pushTag({ event: 'setEmail', email: this.userEmailHash });
  }

  pushTag(tagObj) {
    window.criteo_q = window.criteo_q || [];
    window.criteo_q.push(tagObj);

    const entry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString(),
      event: tagObj.event,
      payload: tagObj
    };
    this.logs.unshift(entry);
    if (this.logs.length > 50) this.logs.pop();
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

  // --- Criteo Event Triggers ---

  trackViewHome() {
    this.pushTag({ event: 'viewHome' });
  }

  trackViewList(itemIds, keywords = '') {
    this.pushTag({
      event: 'viewList',
      item: itemIds.slice(0, 5),
      keywords
    });
  }

  trackViewItem(itemId, price) {
    this.pushTag({
      event: 'viewItem',
      item: itemId,
      price
    });
  }

  trackViewBasket(items) {
    this.pushTag({
      event: 'viewBasket',
      item: items.map((it) => ({
        id: it.id,
        price: it.price,
        quantity: it.quantity
      }))
    });
  }

  trackTransaction(transactionId, items) {
    this.pushTag({
      event: 'trackTransaction',
      id: transactionId,
      item: items.map((it) => ({
        id: it.id,
        price: it.price,
        quantity: it.quantity
      }))
    });
  }
}

export const criteo = new CriteoService();
