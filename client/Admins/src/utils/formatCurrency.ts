const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export default function formatCurrency(num: number) {
  return CURRENCY_FORMATTER.format(num);
}
