export function formatMoney(priceCents: number) {
  return `${priceCents<0?'-':''}$${Math.abs((priceCents / 100)).toFixed(2)}`;
}