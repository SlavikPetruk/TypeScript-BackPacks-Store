import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type CartItemType = {
  id: string
  title: string
  type: string
  size: number
  price: number
  count: number
  imageUrl: string
}

interface ICartItem {
  totalPrice: number
  totalCount: number
  items: CartItemType[]
}

const initialState: ICartItem = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }

      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0)

      state.totalCount = state.items.reduce((sum, obj) => obj.count + sum, 0)
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
    
        if (findItem) {
          findItem.count--
        }
      
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
    clearItem(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const selectorCart = (state: RootState) => state.cart
export const selectorCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id)

export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions

export default cartSlice.reducer
