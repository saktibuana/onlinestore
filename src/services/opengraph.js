/**
 * OpenGraph & Twitter Cards Meta Service
 * Manages social tags and provides social sharing preview generator
 */

class OpenGraphService {
  updateMeta({ title, description, image, url, type = 'website', price, currency = 'IDR' }) {
    // Standard Title
    if (title) document.title = title;

    // OpenGraph Tags
    this.setMetaTag('property', 'og:title', title);
    this.setMetaTag('property', 'og:description', description);
    this.setMetaTag('property', 'og:image', image);
    this.setMetaTag('property', 'og:url', url || window.location.href);
    this.setMetaTag('property', 'og:type', type);
    this.setMetaTag('property', 'og:site_name', 'Tokopedia');

    // Twitter Tags
    this.setMetaTag('name', 'twitter:card', 'summary_large_image');
    this.setMetaTag('name', 'twitter:site', '@tokopedia');
    this.setMetaTag('name', 'twitter:title', title);
    this.setMetaTag('name', 'twitter:description', description);
    this.setMetaTag('name', 'twitter:image', image);

    // Product OG Tags if applicable
    if (price) {
      this.setMetaTag('property', 'product:price:amount', price.toString());
      this.setMetaTag('property', 'product:price:currency', currency);
    }
  }

  setMetaTag(attrName, attrValue, content) {
    if (!content) return;
    let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  }

  getMetaSummary() {
    return {
      title: document.title,
      description: document.querySelector('meta[property="og:description"]')?.content || document.querySelector('meta[name="description"]')?.content || '',
      image: document.querySelector('meta[property="og:image"]')?.content || '/icons/tokopedia-logo.svg',
      url: document.querySelector('meta[property="og:url"]')?.content || window.location.href,
      type: document.querySelector('meta[property="og:type"]')?.content || 'website',
      siteName: document.querySelector('meta[property="og:site_name"]')?.content || 'Tokopedia',
      twitterCard: document.querySelector('meta[name="twitter:card"]')?.content || 'summary_large_image'
    };
  }
}

export const openGraph = new OpenGraphService();
