import { analytics } from './analytics';
import { gtm } from './gtm';

const NOTIFICATIONS_KEY = 'tokopedia_notifications_v1';

const DEFAULT_NOTIFICATIONS = {
  // Transaksi Pembelian
  waitingPayment: true,       // Menunggu Pembayaran
  waitingConfirmation: true,  // Menunggu Konfirmasi
  orderProcessed: true,       // Pesanan Diproses
  orderShipped: true,         // Pesanan Dikirim
  orderDelivered: true,       // Pesanan Selesai
  orderReminder: true,        // Pengingat

  // Transaksi Penjualan
  sellerNewOrder: true,       // Pesanan Baru
  sellerOrderArrived: true,   // Pesanan Sudah Tiba
  sellerOrderComplete: true,  // Transaksi Selesai

  // Promo
  promoNewsletter: true       // Newsletter Tokopedia
};

class NotificationService {
  constructor() {
    this.subscribers = new Set();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === NOTIFICATIONS_KEY) {
          this.notify();
        }
      });
    }
  }

  getSettings() {
    try {
      const data = localStorage.getItem(NOTIFICATIONS_KEY);
      return data ? { ...DEFAULT_NOTIFICATIONS, ...JSON.parse(data) } : { ...DEFAULT_NOTIFICATIONS };
    } catch {
      return { ...DEFAULT_NOTIFICATIONS };
    }
  }

  saveSettings(settings) {
    try {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(settings));
      this.notify();
    } catch (e) {
      console.error('Failed to save notification settings:', e);
    }
  }

  toggle(key) {
    const current = this.getSettings();
    const updated = { ...current, [key]: !current[key] };
    this.saveSettings(updated);

    analytics.logEvent('notification_toggle', { key, enabled: updated[key] });
    gtm.pushEvent('notification_preference_toggle', { setting: key, status: updated[key] });

    return updated;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    const settings = this.getSettings();
    this.subscribers.forEach((cb) => cb(settings));
  }
}

export const notificationService = new NotificationService();
