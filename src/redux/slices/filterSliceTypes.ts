export enum SortEnum {
    RATING = 'rating',
    TITLE = 'title',
    PRICE = 'price',
  }
  
export type sortSelectType = { 
    name: string
    sort: SortEnum
  }
  
export interface IFilterSlice {
    searchValue: string
    categoryId: number
    sortSelect: sortSelectType
    sortAscDesc: boolean
    currentPage: number
  }