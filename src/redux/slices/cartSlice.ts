import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalCount, calcTotalPrice } from '../../utils/calcTotalPrice&Count'
import { getCartLocalStorage } from '../../utils/getCartLocalStorage'
import { RootState } from '../store'
import { CartItemType, ICartItem } from './cartSliceTypes'

const cartData = getCartLocalStorage()

const initialState: ICartItem = {
  items: cartData.items,
  totalPrice: cartData.totalPrice,
  totalCount: cartData.totalCount,
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

      state.totalPrice = calcTotalPrice(state.items)
      state.totalCount = calcTotalCount(state.items)
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
    
        if (findItem && findItem.count > 1) {
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
