import qs from 'qs'
import { FC, useCallback, useEffect } from 'react'
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

const Home: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = useRef(false) //перевірка на запит
  const isMouned = useRef(false) //перевірка на перший рендер

  const { items, status } = useSelector(selectorPizza)
  const { categoryId, sortSelect, sortAscDesc, currentPage, searchValue } =
    useSelector(selectorFilter)

  // response data
  const dataResponse = () => {
    const sortBy = sortSelect.sort

    dispatch(
      fetchPizzas({
        categoryId,
        sortBy,
        sortAscDesc,
        currentPage: String(currentPage),
        searchValue,
      }),
    )
  }

  // якщо був перший рендер, запрошуєм дані
  useEffect(() => {
    // window.scrollTo(0, 700)

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
      dispatch(setUrl({ ...params, sortSelect }))
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

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [])

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        </div>
        <div className="titlePlusSort">
          <h2 className="content__title">Все пиццы</h2>
          <Sort />
        </div>
        {status === 'ERROR' || items.length < 1 ? (
          <img src={notFound} alt="not found" />
        ) : (
          <div className="content__items">
            {status === 'LOADING'
              ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
              : items.map((obj: any) => (
                  <Link key={obj.id} to={`/pizza/${obj.id}`}>
                    <PizzaBlock {...obj} />
                  </Link>
                ))}
          </div>
        )}
        <Pagination onChangePage={(numbPage) => dispatch(setCurrentPage(numbPage))} />
      </div>
    </>
  )
}

export default Home
