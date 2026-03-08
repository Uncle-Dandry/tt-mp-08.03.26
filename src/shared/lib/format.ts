export const formatPrice = (value: number) => new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(value)

export const formatRating = (value: number) => `${value.toFixed(1)}/5`
