import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IFilterSlice, SortEnum, sortSelectType } from './filterSliceTypes'

const initialState:IFilterSlice = {
  searchValue: '',
  categoryId: 0,
  sortSelect: { name: 'популярності', sort: SortEnum.RATING },
  sortAscDesc: true,
  currentPage: 1,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSortSelect(state, action: PayloadAction<sortSelectType>) {
      state.sortSelect = action.payload
    },
    setSortAscDesc(state, action: PayloadAction<boolean>) {
      state.sortAscDesc = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setUrl(state, action) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage)
        state.categoryId = Number(action.payload.categoryId)
        state.sortSelect = action.payload.sortSelect
      } else {
        state.currentPage = 1
        state.categoryId = 0
        state.sortSelect = { name: 'популярності', sort: SortEnum.RATING }
      }
    },
  },
})


export const selectorFilter = (state:RootState) => state.filter
export const selectorFilterSortSelect = (state:RootState) => state.filter.sortSelect
export const selectorFilterSortAscDesc = (state:RootState) => state.filter.sortAscDesc


export const { setCategoryId, setSortSelect, setSearchValue, setSortAscDesc, setCurrentPage, setUrl } = filterSlice.actions

export default filterSlice.reducer