// Formats a number with thousands separators, e.g. 1799 -> "1,799".
export function formatAmount(price) {
  if (typeof price === 'number') {
    return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return String(price);
}

export function formatPrice(price) {
  if (price === null || price === undefined) return 'Ask us';
  return `Rs ${formatAmount(price)}`;
}
