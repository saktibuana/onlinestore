import branch from 'branch-sdk';

/**
 * Branch.io Deep Linking & Attribution Service
 * Recreating Tokopedia's mobile-first deep linking and Branch Journeys integration
 */

class BranchService {
  constructor() {
    this.branchKey = 'key_live_kaY6xY7Vq74N6p0Pq90VbnpaxA';
    this.isInitialized = false;
    this.logs = [];
    this.subscribers = new Set();
    this.init();
  }

  init() {
    try {
      branch.init(this.branchKey, { no_journeys: true }, (err, data) => {
        this.isInitialized = true;
        this.logEvent('BRANCH_INIT', {
          status: err ? 'FALLBACK_READY' : 'INITIALIZED',
          branchKey: this.branchKey,
          data: data || { session_id: 'sess_' + Math.random().toString(36).substring(2, 9) }
        });
      });
    } catch (e) {
      console.warn('Branch SDK fallback mode activated:', e);
      this.isInitialized = true;
      this.logEvent('BRANCH_INIT_FALLBACK', {
        branchKey: this.branchKey,
        mode: 'simulated_fallback'
      });
    }
  }

  logEvent(eventName, payload = {}) {
    const entry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString(),
      eventName,
      payload
    };
    this.logs.unshift(entry);
    if (this.logs.length > 50) this.logs.pop();
    this.notify();

    // Call real branch logEvent if supported
    try {
      if (typeof branch.logEvent === 'function') {
        branch.logEvent(eventName, payload);
      }
    } catch (_) {}
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

  /**
   * Generates a Branch deep link for a Tokopedia product or route
   */
  createDeepLink({ path, title, description, imageUrl, customData = {} }) {
    const linkData = {
      tags: ['tokopedia_web_share', 'mpa'],
      channel: 'Web',
      feature: 'Share',
      campaign: 'Tokopedia Web Referral',
      data: {
        '$canonical_url': window.location.origin + path,
        '$og_title': title || 'Beli di Tokopedia',
        '$og_description': description || 'Belanja mudah, aman, dan berlimpah promo di Tokopedia.',
        '$og_image_url': imageUrl || `${window.location.origin}/icons/tokopedia-logo.svg`,
        '$desktop_url': window.location.origin + path,
        '$android_url': 'https://play.google.com/store/apps/details?id=com.tokopedia.tkpd',
        '$ios_url': 'https://apps.apple.com/id/app/tokopedia/id1007880279',
        ...customData
      }
    };

    return new Promise((resolve) => {
      try {
        branch.link(linkData, (err, link) => {
          if (!err && link) {
            this.logEvent('CREATE_DEEP_LINK', { link, linkData });
            resolve(link);
          } else {
            // Simulated Branch App Link fallback
            const fallbackLink = `https://tokopedia.app.link${path}?utm_source=branch_web&_branch_match_id=${Date.now()}`;
            this.logEvent('CREATE_DEEP_LINK_FALLBACK', { link: fallbackLink, linkData });
            resolve(fallbackLink);
          }
        });
      } catch (e) {
        const fallbackLink = `https://tokopedia.app.link${path}?utm_source=branch_web`;
        this.logEvent('CREATE_DEEP_LINK_FALLBACK', { link: fallbackLink, linkData });
        resolve(fallbackLink);
      }
    });
  }

  // Branch Journeys / Smart Banner Event
  trackJourneyInteraction(action, details = {}) {
    this.logEvent('JOURNEY_INTERACTION', {
      journey: 'Tokopedia Smart Banner',
      action, // e.g. 'IMPRESSION', 'CLICK_OPEN_APP', 'DISMISS'
      ...details
    });
  }
}

export const branchService = new BranchService();
