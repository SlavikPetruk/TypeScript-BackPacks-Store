import React, { FC, useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSortSelect, setSortAscDesc, selectorFilterSortSelect, selectorFilterSortAscDesc } from '../redux/slices/filterSlice'
import { SortEnum } from '../redux/slices/filterSliceTypes'


type SortListType = {
  name: string
  sort: SortEnum
}

export const sortList:SortListType[] = [
  { name: 'популярності', sort: SortEnum.RATING },
  { name: 'ціні', sort: SortEnum.PRICE },
  { name: 'алфавіту', sort: SortEnum.TITLE },
]

const Sort:FC = React.memo(() => {
  const dispatch = useDispatch()
  const sortRef = useRef<HTMLDivElement>(null)
  const sortSelect = useSelector(selectorFilterSortSelect)
  const sortAscDesc = useSelector(selectorFilterSortAscDesc)

  console.log('sortSelect', sortSelect)

  const [open, setOpen] = useState(false)

  const onClickListItem = (obj:any) => {
    dispatch(setSortSelect(obj))
    setOpen(false)
  }

  useEffect(() => {
    const sortClickListener = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path : Node[]
      }
      if ( sortRef.current && !_event.path.includes(sortRef.current))   setOpen(false)
    }

    document.body.addEventListener('click', sortClickListener)
    
    return () => document.body.removeEventListener('click', sortClickListener)
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <div
          onClick={() => {
            dispatch(setSortAscDesc(!sortAscDesc))
          }}>
          <svg
            width="14"
            className={`sort__arrow ${ sortAscDesc === false ? 'active' : '' }`}
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        </div>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sortSelect.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                className={sortSelect.sort === obj.sort ? 'active' : ''}
                onClick={() => onClickListItem(obj)}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
})
export default Sort
