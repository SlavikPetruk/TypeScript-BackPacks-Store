import { useNavigate, useParams } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import axios from 'axios'

// type Pizza= {
//   imageUrl: string,
//   title: string,
//   price: string
// }

const PizzaPage: FC = () => {
  const typeName: string[] = ['тонкі', 'традиційні']

  const { id } = useParams()
  const navigate = useNavigate()
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
  }>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          'https://62909a7e665ea71fe1365744.mockapi.io/pizza_items/' + id,
        )
        setPizza(data)
      } catch (error) {
        alert('Помилка при отриманні піц!!!')
        navigate('/')
      }
    }
    fetchData()
  }, [])

  if (!pizza) return <>Loading...</>

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{pizza.title}</h4>
        <div className="pizza-block__selector">
          <ul>
            { typeName.map((typeId, i) => (
              <li
                // className={activeType === typeId ? 'active' : ''}
                key={typeId}>
                {typeName[i-1]}
              </li>
            ))}
          </ul>
          <ul>
            {/* {sizes.map((size, i) => (
              <li
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? 'active' : ''}
                key={size}>
                {size} см.
              </li>
            ))} */}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {pizza.price} ₴</div>
          <div className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {/* {addCount > 0 ? <i>{addCount}</i> : ' '} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PizzaPage
