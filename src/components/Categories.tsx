import React, { FC } from 'react'

type CategoriesProps = {
  categoryId: number
  onChangeCategory: (id: number) => void
}
export const categories = [
    { id: 0, title: 'Всі рюкзаки' },
    { id: 1, title: 'Подорожі' },
    { id: 2, title: 'Міські' },
    { id: 3, title: 'Велорюкзаки' },
    { id: 4, title: 'Climbing' },
    { id: 5, title: 'Зимові' },
  ]

const Categories: FC<CategoriesProps> = React.memo(({ categoryId, onChangeCategory }) => {


  return (
    <div className="categories">
      <ul>
        {categories.map((li) => (
          <li
            key={li.id}
            onClick={() => onChangeCategory(li.id)}
            className={categoryId === li.id ? 'active' : ''}>
            {li.title}
          </li>
        ))}
      </ul>
    </div>
  )
})

export default Categories
