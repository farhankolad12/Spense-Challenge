export function formatCurrency(num: number, currency: string) {
  const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 2,
  });

  return CURRENCY_FORMATTER.format(num);
}
