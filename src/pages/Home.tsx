import qs from 'qs'
import { FC, useEffect } from 'react'
import Categories from '../components/Categories'
import { Pagination } from '../components/Pagination'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import Sort, { sortList } from '../components/Sort'
import notFound from '../assets/nodata-found.png'

import { useSelector } from 'react-redux'
import { selectorFilter, setCategoryId, setCurrentPage, setUrl } from '../redux/slices/filterSlice'
import { useNavigate, Link } from 'react-router-dom'
import { useRef } from 'react'
import { fetchPizzas, selectorPizza } from '../redux/slices/pizzaSlice'
import { useAppDispatch } from '../redux/store'


const Home:FC = () => {
  const navigate = useNavigate()
  const dispath = useAppDispatch()
  const isSearch = useRef(false) //перевірка на запит
  const isMouned = useRef(false) //перевірка на перший рендер

  const { items, status } = useSelector(selectorPizza)
  const { categoryId, sortSelect, sortAscDesc, currentPage, searchValue } = useSelector(selectorFilter)

  // response data
  const dataResponse = () =>{
    const sortBy = sortSelect.sort
    const category = categoryId > 0 ? String(categoryId) : '';
    const search = searchValue;

    dispath(
      // @ts-ignore
      fetchPizzas({ categoryId, sortBy, sortAscDesc, currentPage, searchValue }))}

  // якщо був перший рендер, запрошуєм дані
  useEffect(() => {
    window.scrollTo(0, 820)

    if (!isSearch.current) {
      dataResponse()
    }
    isSearch.current = false
  }, [categoryId, sortSelect, sortAscDesc, currentPage, searchValue])

  // якщо змінюють фільтер у адресній стрічці - передаєм в редакс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sortSelect = sortList.find((list) => list.sort === params.sortSelect)
      dispath(setUrl({ ...params, sortSelect }))
      isSearch.current = true
    }
  }, [])

  // вшиваєм параметри в адресну строку через редакс
  useEffect(() => {
    if (isMouned.current) {
      const queryString = qs.stringify({
        categoryId,
        sortSelect: sortSelect.sort,
        currentPage,
        searchValue,
      })
      navigate(`?${queryString}`)
    }
    isMouned.current = true
  }, [categoryId, sortSelect.sort, currentPage, searchValue])

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            onChangeCategory={(id) => {
              dispath(setCategoryId(id))
            }}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        { (status === 'ERROR' || items.length < 1)
        ? ( 
        <img src={notFound} alt="not found" /> 
        ) 
        : (
          <div className="content__items">
            {status === 'LOADING'
              ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
              : items.map((obj:any) => <Link key={obj.id} to={`/pizza/${obj.id}`}>
                                      <PizzaBlock  {...obj} />
                                    </Link>)}
          </div>
        )}
        <Pagination onChangePage={(numbPage) => dispath(setCurrentPage(numbPage))} />
      </div>
    </>
  )
}

export default Home
