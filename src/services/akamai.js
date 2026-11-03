/**
 * Akamai Edge Services & mPulse RUM Simulation
 * Mirroring Tokopedia's production Akamai CDN & EdgeWorker architecture
 */

class AkamaiService {
  constructor() {
    this.edgeNode = 'cgk-id-edge-worker-01.tokopedia.com.edgekey.net';
    this.edgeRegion = 'Jakarta, Indonesia (CGK)';
    this.edgeWorkerVersion = 'v3.8.2-edge-routing';
    this.cacheStatus = 'HIT';
    this.ttfbMs = Math.floor(Math.random() * 15) + 12; // 12-27ms edge response
    this.subscribers = new Set();
    this.logs = [];

    // Simulate Akamai mPulse Boomerang RUM
    this.rumMetrics = {
      lcp: (0.42 + Math.random() * 0.3).toFixed(2) + 's',
      fid: (4 + Math.random() * 8).toFixed(1) + 'ms',
      cls: (0.005 + Math.random() * 0.02).toFixed(3),
      ttfb: this.ttfbMs + 'ms',
      fcp: (0.28 + Math.random() * 0.2).toFixed(2) + 's',
      edgeCacheHitRatio: '98.4%',
      bandwidthSaved: '64.2% (Akamai Image Manager)'
    };

    this.logEdgeActivity('EDGE_INIT', {
      edgeNode: this.edgeNode,
      region: this.edgeRegion,
      worker: this.edgeWorkerVersion,
      cacheStatus: this.cacheStatus,
      edgeControl: 'cache-maxage=86400, stale-while-revalidate=604800'
    });
  }

  logEdgeActivity(action, data) {
    const entry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString(),
      action,
      data
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
    this.subscribers.forEach((cb) => cb(this.getState()));
  }

  getState() {
    return {
      edgeNode: this.edgeNode,
      edgeRegion: this.edgeRegion,
      edgeWorkerVersion: this.edgeWorkerVersion,
      cacheStatus: this.cacheStatus,
      ttfbMs: this.ttfbMs,
      rumMetrics: this.rumMetrics,
      logs: this.logs
    };
  }

  /**
   * Transforms an image URL simulating Akamai Image Manager (IM)
   * Dynamically optimizes resolution, WebP/AVIF format, and compression.
   */
  transformImageUrl(src, { width = 400, quality = 85, format = 'webp' } = {}) {
    if (!src) return '';
    // If it's an Unsplash or external image, apply edge transforms
    if (src.includes('images.unsplash.com')) {
      const url = new URL(src);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('ak-edge', 'im-v2');
      return url.toString();
    }
    // For local assets or other origins, add Akamai query parameters
    return `${src}?ak-w=${width}&ak-q=${quality}&ak-fmt=${format}&ak-cache=1`;
  }

  recordEdgeRequest(url, method = 'GET') {
    this.logEdgeActivity('EDGE_CACHE_CHECK', {
      url,
      method,
      status: this.cacheStatus,
      edgeServer: this.edgeNode,
      headers: {
        'Edge-Control': 'cache-maxage=86400',
        'Akamai-Cache-Status': this.cacheStatus,
        'Akamai-Edge-Worker': this.edgeWorkerVersion
      }
    });
  }
}

export const akamai = new AkamaiService();
