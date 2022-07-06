import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PizzaBlockProps } from '../../components/PizzaBlock/PizzaBlock'
import { RootState } from '../store'
import { FetchPizzasProps, IPizzaSlice, StatusEnum } from './pizzaSliceTypes'


export const fetchPizzas = createAsyncThunk<PizzaBlockProps[], FetchPizzasProps>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { categoryId, sortBy, sortAscDesc, currentPage, searchValue } = params
    const { data } = await axios.get<PizzaBlockProps[]>(
      `https://62909a7e665ea71fe1365744.mockapi.io/pizza_items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortBy}&order=${
        sortAscDesc === true ? 'asc' : 'desc'
      }&page=${currentPage}&limit=8&search=${searchValue}`,
    )
    return data
  },
)

const initialState: IPizzaSlice = {
  items: [],
  status: StatusEnum.LOADING,
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaBlockProps[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = StatusEnum.LOADING
      state.items = []
    }),
      builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaBlockProps[]>) => {
        state.items = action.payload
        state.status = StatusEnum.SUCCESS
      }),
      builder.addCase(fetchPizzas.rejected, (state) => {
        state.status = StatusEnum.ERROR
        state.items = []
      })
  },
})

export const selectorPizza = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
