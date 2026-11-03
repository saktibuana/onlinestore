import { analytics } from './analytics';
import { gtm } from './gtm';

const PAYMENT_KEY = 'tokopedia_payment_settings_v1';

const DEFAULT_PAYMENT = {
  activeMethod: 'gopay', // 'gopay' | 'dana'
  gopay: {
    isConnected: true,
    maskedPhone: '**** **** **217',
    balance: 51061,
    coins: 173,
    email: 'sakti@buana.studio',
    connectedSince: '14 Oct 2021 15:18 WIB'
  },
  dana: {
    isConnected: false,
    maskedPhone: '**** **** **217',
    balance: 0,
    email: 'sakti@buana.studio',
    connectedSince: null
  }
};

class PaymentService {
  constructor() {
    this.subscribers = new Set();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === PAYMENT_KEY) {
          this.notify();
        }
      });
    }
  }

  getSettings() {
    try {
      const data = localStorage.getItem(PAYMENT_KEY);
      return data ? { ...DEFAULT_PAYMENT, ...JSON.parse(data) } : { ...DEFAULT_PAYMENT };
    } catch {
      return { ...DEFAULT_PAYMENT };
    }
  }

  saveSettings(settings) {
    try {
      localStorage.setItem(PAYMENT_KEY, JSON.stringify(settings));
      this.notify();
    } catch (e) {
      console.error('Failed to save payment settings:', e);
    }
  }

  setActiveMethod(method) {
    const current = this.getSettings();
    const updated = { ...current, activeMethod: method };
    this.saveSettings(updated);
    analytics.logEvent('payment_method_switched', { method });
    gtm.pushEvent('payment_method_selected', { method });
    return updated;
  }

  disconnectGopay() {
    const current = this.getSettings();
    const updated = {
      ...current,
      gopay: {
        ...current.gopay,
        isConnected: false
      }
    };
    this.saveSettings(updated);
    analytics.logEvent('gopay_disconnected');
    gtm.pushEvent('gopay_disconnected');
    return updated;
  }

  reconnectGopay() {
    const current = this.getSettings();
    const updated = {
      ...current,
      gopay: {
        ...DEFAULT_PAYMENT.gopay,
        isConnected: true
      }
    };
    this.saveSettings(updated);
    analytics.logEvent('gopay_connected');
    gtm.pushEvent('gopay_connected');
    return updated;
  }

  toggleDana() {
    const current = this.getSettings();
    const isNow = !current.dana.isConnected;
    const updated = {
      ...current,
      dana: {
        ...current.dana,
        isConnected: isNow,
        connectedSince: isNow ? '03 Nov 2026 13:20 WIB' : null,
        balance: isNow ? 150000 : 0
      }
    };
    this.saveSettings(updated);
    analytics.logEvent('dana_connection_toggled', { connected: isNow });
    gtm.pushEvent('dana_connection_toggled', { connected: isNow });
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

export const paymentService = new PaymentService();
