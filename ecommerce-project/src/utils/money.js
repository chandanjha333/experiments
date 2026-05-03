export function formatMoney(priceCents) {
  return `${priceCents<0?'-':''}$${Math.abs((priceCents / 100)).toFixed(2)}`;
}