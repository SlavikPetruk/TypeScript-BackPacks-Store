import { CartItemType } from "../redux/slices/cartSliceTypes"


export const calcTotalPrice = (items: CartItemType[]) => {
   return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}


export const calcTotalCount = (items: CartItemType[]) => {
   return items.reduce((sum, obj) => obj.count + sum, 0)
}