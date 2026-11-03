/**
 * Production-Grade E-Commerce Search Engine
 * Solves Indonesian morphology & word boundary search issues (e.g. 'meja' != 'kemeja', 'tas' != 'kualitas')
 */

// Tokenizes text into distinct normalized words
export function tokenize(text) {
  if (!text || typeof text !== 'string') return [];
  return text
    .toLowerCase()
    .replace(/[^\w\d\s-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 0);
}

// Checks if a candidate word matches the query token accurately without false substring poisoning
export function matchWord(candidateWord, queryToken) {
  if (!candidateWord || !queryToken) return 0;
  const cw = candidateWord.toLowerCase();
  const qt = queryToken.toLowerCase();

  // 1. Exact match (highest relevance)
  if (cw === qt) return 100;

  // 2. Compound word with hyphen (e.g., 'meja-lipat' contains 'meja')
  if (cw.includes('-')) {
    const subWords = cw.split('-');
    if (subWords.includes(qt)) return 95;
  }

  // 3. Whole-word prefix match: only if query is at least 3 chars AND word starts with query
  // Example: 'smartwatch' matches 'smartwatches', 'laptop' matches 'laptops'
  // But 'meja' will NEVER match 'kemeja' because 'kemeja' does NOT start with 'meja'!
  if (qt.length >= 3 && cw.startsWith(qt)) {
    // If the difference is just plural ('s') or Indonesian reduplication
    if (cw === `${qt}s` || cw === `${qt}an` || cw === `${qt}mu` || cw === `${qt}nya`) {
      return 90;
    }
    // Prefix match
    return 70;
  }

  // No match
  return 0;
}

/**
 * Calculates relevance score for a product given a set of query tokens
 */
export function calculateProductRelevance(product, queryTokens) {
  if (!queryTokens || queryTokens.length === 0) return 1;

  const titleWords = tokenize(product.title);
  const categoryWords = tokenize(product.categoryName || product.category || '');
  const brandWords = tokenize(product.brand || '');
  const tagWords = tokenize(product.tags ? product.tags.join(' ') : '');
  const descWords = tokenize(product.description || '');

  let totalScore = 0;
  let allTokensMatched = true;

  for (const qToken of queryTokens) {
    let bestScoreForToken = 0;

    // 1. Title match (Weight 10x)
    for (const tw of titleWords) {
      const s = matchWord(tw, qToken);
      if (s > 0) {
        bestScoreForToken = Math.max(bestScoreForToken, s * 10);
      }
    }

    // 2. Category match (Weight 5x)
    for (const cw of categoryWords) {
      const s = matchWord(cw, qToken);
      if (s > 0) {
        bestScoreForToken = Math.max(bestScoreForToken, s * 5);
      }
    }

    // 3. Brand match (Weight 4x)
    for (const bw of brandWords) {
      const s = matchWord(bw, qToken);
      if (s > 0) {
        bestScoreForToken = Math.max(bestScoreForToken, s * 4);
      }
    }

    // 4. Tags match (Weight 4x)
    for (const tg of tagWords) {
      const s = matchWord(tg, qToken);
      if (s > 0) {
        bestScoreForToken = Math.max(bestScoreForToken, s * 4);
      }
    }

    // 5. Description match (Weight 1x - only word boundary)
    if (bestScoreForToken === 0) {
      for (const dw of descWords) {
        const s = matchWord(dw, qToken);
        if (s > 0) {
          bestScoreForToken = Math.max(bestScoreForToken, s * 1);
        }
      }
    }

    if (bestScoreForToken === 0) {
      allTokensMatched = false;
    } else {
      totalScore += bestScoreForToken;
    }
  }

  // All tokens must match for strong multi-word precision (e.g. "meja belajar")
  if (!allTokensMatched) {
    return 0;
  }

  return totalScore;
}

/**
 * Searches and ranks products accurately
 */
export function searchProducts(allProducts, rawQuery, filters = {}) {
  const queryTokens = tokenize(rawQuery);

  let results = allProducts.map((p) => {
    const score = queryTokens.length > 0 ? calculateProductRelevance(p, queryTokens) : 1;
    return { product: p, score };
  });

  // Filter out products with 0 relevance score when a query is provided
  if (queryTokens.length > 0) {
    results = results.filter((item) => item.score > 0);
  }

  // Extract products
  let matchedProducts = results.map((item) => item.product);

  // Apply filters
  if (filters.category && filters.category !== 'all') {
    matchedProducts = matchedProducts.filter(
      (p) => p.category === filters.category || p.categorySlug === filters.category
    );
  }

  if (filters.officialOnly) {
    matchedProducts = matchedProducts.filter((p) => p.shop?.isOfficial);
  }

  if (filters.freeShippingOnly) {
    matchedProducts = matchedProducts.filter((p) => p.hasFreeShipping);
  }

  if (filters.minRating) {
    matchedProducts = matchedProducts.filter((p) => p.rating >= filters.minRating);
  }

  if (filters.minPrice) {
    matchedProducts = matchedProducts.filter((p) => p.price >= filters.minPrice);
  }

  if (filters.maxPrice) {
    matchedProducts = matchedProducts.filter((p) => p.price <= filters.maxPrice);
  }

  // Sort
  const sortBy = filters.sortBy || 'relevant';
  matchedProducts.sort((a, b) => {
    if (sortBy === 'lowestPrice') {
      return a.price - b.price;
    }
    if (sortBy === 'highestPrice') {
      return b.price - a.price;
    }
    if (sortBy === 'highestRating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'latest') {
      return (b.id || '').localeCompare(a.id || '');
    }
    // Default 'relevant': sort by relevance score descending
    const scoreA = results.find((r) => r.product.id === a.id)?.score || 0;
    const scoreB = results.find((r) => r.product.id === b.id)?.score || 0;
    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }
    return (b.soldCount || 0) - (a.soldCount || 0);
  });

  return matchedProducts;
}

/**
 * Calculates relevance score for a store given search query tokens
 * Searches store name, description, location, and its preview products
 */
export function calculateStoreRelevance(store, queryTokens) {
  if (!queryTokens || queryTokens.length === 0) return 1;

  const nameWords = tokenize(store.name);
  const descWords = tokenize(store.description || '');
  const locWords = tokenize(store.location || '');
  const prodWords = tokenize(store.products ? store.products.map((p) => p.title).join(' ') : '');

  let totalScore = 0;
  let hasAnyMatch = false;

  for (const qToken of queryTokens) {
    let bestTokenScore = 0;

    // 1. Store Name match (weight 12x)
    for (const nw of nameWords) {
      const s = matchWord(nw, qToken);
      if (s > 0) {
        bestTokenScore = Math.max(bestTokenScore, s * 12);
      }
    }

    // 2. Store Description match (weight 6x)
    for (const dw of descWords) {
      const s = matchWord(dw, qToken);
      if (s > 0) {
        bestTokenScore = Math.max(bestTokenScore, s * 6);
      }
    }

    // 3. Product titles in store (weight 4x)
    for (const pw of prodWords) {
      const s = matchWord(pw, qToken);
      if (s > 0) {
        bestTokenScore = Math.max(bestTokenScore, s * 4);
      }
    }

    // 4. Location match (weight 2x)
    for (const lw of locWords) {
      const s = matchWord(lw, qToken);
      if (s > 0) {
        bestTokenScore = Math.max(bestTokenScore, s * 2);
      }
    }

    if (bestTokenScore > 0) {
      hasAnyMatch = true;
      totalScore += bestTokenScore;
    }
  }

  return hasAnyMatch ? totalScore : 0;
}

/**
 * Searches and sorts stores lively
 */
export function searchStores(allStores, rawQuery, filters = {}) {
  const queryTokens = tokenize(rawQuery);

  let scored = allStores.map((s) => {
    const score = queryTokens.length > 0 ? calculateStoreRelevance(s, queryTokens) : 1;
    return { store: s, score };
  });

  if (queryTokens.length > 0) {
    scored = scored.filter((item) => item.score > 0);
  }

  let matchedStores = scored.map((item) => item.store);

  // Filter by Shop Type ('pm-pro', 'power-shop', 'official')
  if (filters.types && filters.types.length > 0) {
    matchedStores = matchedStores.filter((s) => filters.types.includes(s.type));
  }

  // Filter by Location
  if (filters.locations && filters.locations.length > 0) {
    matchedStores = matchedStores.filter((s) =>
      filters.locations.some((loc) =>
        s.location.toLowerCase().includes(loc.toLowerCase()) ||
        (s.province && s.province.toLowerCase().includes(loc.toLowerCase()))
      )
    );
  }

  // Filter by store name search input if provided
  if (filters.storeNameQuery && filters.storeNameQuery.trim()) {
    const nameQ = filters.storeNameQuery.toLowerCase().trim();
    matchedStores = matchedStores.filter((s) => s.name.toLowerCase().includes(nameQ));
  }

  // Lively Sorting
  const sortBy = filters.sortBy || 'relevant';
  matchedStores.sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'mostProducts') {
      return (b.products?.length || 0) - (a.products?.length || 0);
    }
    if (sortBy === 'mostTransactions') {
      return b.transactions - a.transactions;
    }
    if (sortBy === 'nameAsc') {
      return a.name.localeCompare(b.name, 'id');
    }
    if (sortBy === 'nameDesc') {
      return b.name.localeCompare(a.name, 'id');
    }
    // Default 'relevant'
    const scoreA = scored.find((item) => item.store.id === a.id)?.score || 0;
    const scoreB = scored.find((item) => item.store.id === b.id)?.score || 0;
    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }
    return b.transactions - a.transactions;
  });

  return matchedStores;
}
