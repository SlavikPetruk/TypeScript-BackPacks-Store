import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import backpack from './slices/backpackSlice'
import { useDispatch } from 'react-redux'


export const store = configureStore({
  reducer: {
    filter,
    cart,
    backpack,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()