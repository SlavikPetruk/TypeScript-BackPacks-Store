export type CartItemType = {
    id: string
    title: string
    type: string
    size: number
    price: number
    count: number
    imageUrl: string
  }
  
export interface ICartItem {
    totalPrice: number
    totalCount: number
    items: CartItemType[]
  }