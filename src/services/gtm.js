/**
 * Google Tag Manager (GTM) Integration
 * Container ID: GTM-TKPD988
 */

class GTMService {
  constructor() {
    this.containerId = 'GTM-TKPD988';
    this.logs = [];
    this.subscribers = new Set();
    this.init();
  }

  init() {
    window.dataLayer = window.dataLayer || [];

    // Push initial gtm.js script event
    this.pushEvent('gtm.js', {
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    this.pushEvent('tokopedia_app_ready', {
      app_name: 'Tokopedia Multi-Page React',
      environment: 'production',
      akamai_edge: 'active',
      pwa_ready: true
    });
  }

  pushEvent(eventName, payload = {}) {
    window.dataLayer = window.dataLayer || [];
    const eventObj = {
      event: eventName,
      timestamp: Date.now(),
      ...payload
    };

    window.dataLayer.push(eventObj);

    const entry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString(),
      eventName,
      payload: eventObj
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
}

export const gtm = new GTMService();
