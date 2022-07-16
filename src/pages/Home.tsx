import qs from 'qs'
import { FC, useCallback, useEffect } from 'react'
import Categories, { categories } from '../components/Categories'
import { Pagination } from '../components/Pagination'
import BackPackBlock from '../components/BackPackBlock/BackPackBlock'
import { Skeleton } from '../components/BackPackBlock/Skeleton'
import Sort, { sortList } from '../components/Sort'
import notFound from '../assets/nodata-found.png'


import { useSelector } from 'react-redux'
import { selectorFilter, setCategoryId, setCurrentPage, setUrl } from '../redux/slices/filterSlice'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { fetchBackPacks, selectorBackPack } from '../redux/slices/backpackSlice'
import { useAppDispatch } from '../redux/store'

const Home: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = useRef(false) //перевірка на запит
  const isMouned = useRef(false) //перевірка на перший рендер

  const { items, status } = useSelector(selectorBackPack)
  const { categoryId, sortSelect, sortAscDesc, currentPage, searchValue } =
    useSelector(selectorFilter)


  // якщо був перший рендер, запрошуєм дані
  useEffect(() => {
    // window.scrollTo(0, 700)
      // response data
  const dataResponse = () => {
    const sortBy = sortSelect.sort

    dispatch(
      fetchBackPacks({
        categoryId,
        sortBy,
        sortAscDesc,
        currentPage: String(currentPage),
        searchValue,
      }),
    )
  }

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
        <h2 className="content__title">{categories[categoryId].title}</h2>
          
          <Sort />
        </div>
        {status === 'ERROR' || items.length < 1 ? (
          <img src={notFound} alt="not found" />
        ) : (
          <div className="content__items">
            {status === 'LOADING'
              ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
              : items.map((obj: any) => (
                  
                    <BackPackBlock key={obj.id} {...obj} />
                  
                ))}
          </div>
        )}
        <Pagination onChangePage={(numbPage) => dispatch(setCurrentPage(numbPage))} />
      </div>
    </>
  )
}

export default Home
