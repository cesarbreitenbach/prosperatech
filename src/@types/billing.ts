export interface ProductItemProps {
    oneTimePurchaseOfferDetails?: OneTimePurchaseOfferDetails
    name?: string
    productId?: string
    description?: string
    title?: string
    productType?: string
    price?: string
    localizedPrice?: string
    currency?: string
  }
  
export interface OneTimePurchaseOfferDetails {
    priceAmountMicros: string
    formattedPrice: string
    priceCurrencyCode: string
}