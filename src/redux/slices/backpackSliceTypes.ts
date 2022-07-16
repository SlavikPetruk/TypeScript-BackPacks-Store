import { BackPackBlockProps } from "../../components/BackPackBlock/BackPackBlock"

export interface IBackPackSlice {
    items: BackPackBlockProps[]
    status: 'LOADING' | 'SUCCESS' | 'ERROR'
  }
  
export  type FetchBackPacksProps = {
    categoryId: number
    sortBy: string
    sortAscDesc: boolean
    currentPage: string
    searchValue: string
  }
  
export enum StatusEnum {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
  }