import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BackPackBlockProps } from '../../components/BackPackBlock/BackPackBlock'
import { RootState } from '../store'
import { FetchBackPacksProps, IBackPackSlice, StatusEnum } from './backpackSliceTypes'

export const fetchBackPacks = createAsyncThunk<BackPackBlockProps[], FetchBackPacksProps>(
  'backpack/fetchBackPacksStatus',
  async (params) => {
    const { categoryId, sortBy, sortAscDesc, currentPage, searchValue } = params
    const { data } = await axios.get<BackPackBlockProps[]>(
      `https://62909a7e665ea71fe1365744.mockapi.io/backpack_items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortBy}&order=${
        sortAscDesc === true ? 'asc' : 'desc'
      }&page=${currentPage}&limit=8&search=${searchValue}`,
    )
    return data
  },
)

const initialState: IBackPackSlice = {
  items: [],
  status: StatusEnum.LOADING,
}

const backpackSlice = createSlice({
  name: 'backpack',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<BackPackBlockProps[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBackPacks.pending, (state, action) => {
      state.status = StatusEnum.LOADING
      state.items = []
    })

    builder.addCase(fetchBackPacks.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = StatusEnum.SUCCESS
    })

    builder.addCase(fetchBackPacks.rejected, (state, action) => {
      state.status = StatusEnum.ERROR
      state.items = []
    })
  },
})

export const selectorBackPack = (state: RootState) => state.backpack

export const { setItems } = backpackSlice.actions

export default backpackSlice.reducer
