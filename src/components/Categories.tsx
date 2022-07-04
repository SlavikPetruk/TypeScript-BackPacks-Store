import { FC } from "react";

type CategoriesProps = {
  categoryId:  number
  onChangeCategory: (id: number) => void
}

const Categories:FC<CategoriesProps> = ({categoryId, onChangeCategory}) => {

  const categories = [
    { id: 0, title: 'Всі' },
    { id: 1, title: 'Мясні' },
    { id: 2, title: 'Вегетаріанскі' },
    { id: 3, title: 'Гриль' },
    { id: 4, title: 'Гострі' },
    { id: 5, title: 'Закриті' },
  ]

  return (
    <div className="categories">
      <ul>
        {categories.map((li) => (
          <li key={li.id} 
              onClick={()=> onChangeCategory(li.id)} 
              className={categoryId === li.id ? 'active' : ''}>{li.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories
