import { PizzaBlockProps } from "../../components/PizzaBlock/PizzaBlock"

export interface IPizzaSlice {
    items: PizzaBlockProps[]
    status: 'LOADING' | 'SUCCESS' | 'ERROR'
  }
  
export  type FetchPizzasProps = {
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