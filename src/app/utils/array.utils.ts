/**
 * Array utility functions
 */

/**
 * Filters array by search term
 */
export function filterBySearchTerm<T>(
  items: T[],
  searchTerm: string,
  getSearchableValue: (item: T) => string
): T[] {
  const normalizedTerm = searchTerm.toLowerCase().trim();

  if (!normalizedTerm) {
    return [];
  }

  return items.filter(item =>
    getSearchableValue(item).toLowerCase().includes(normalizedTerm)
  );
}

/**
 * Removes duplicates from array based on a key selector
 */
export function uniqueBy<T, K>(array: T[], keySelector: (item: T) => K): T[] {
  const seen = new Set<K>();
  return array.filter(item => {
    const key = keySelector(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Limits array to specified size
 */
export function limit<T>(array: T[], maxSize: number): T[] {
  return array.slice(0, maxSize);
}
