import { FC } from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

type PaginationProps = {
  onChangePage: (e:number) => void
}

export const Pagination:FC<PaginationProps> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      pageRangeDisplayed={8}
      pageCount={3}
      onPageChange={(e) => onChangePage(e.selected + 1)}
      previousLabel="<"
    />
  )
}
