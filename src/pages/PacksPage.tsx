import { useNavigate, useParams } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import axios from 'axios'


const BackPackPage: FC = () => {
  const typeName: string[] = ['тонкі', 'традиційні']
  const sizes: number[] = [26, 32, 40]

  const { id } = useParams()
  const navigate = useNavigate()
  const [backpack, setBackPack] = useState<{
    imageUrl: string
    title: string
    price: number
    sizes: number[]
  }>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          'https://62909a7e665ea71fe1365744.mockapi.io/backpack_items/' + id,
        )
        setBackPack(data)
      } catch (error) {
        alert('Помилка при отриманні піц!!!')
        navigate('/')
      }
    }
    fetchData()
  }, [])

  if (!backpack) return <>Loading...</>

  return (
    <div className="backpackPage-block-wrapper">
      <h1 className="backpackPage-block__title">{backpack.title}</h1>
      <div className="backpackPage-block">
        <img className="backpackPage-block__image" src={backpack.imageUrl} alt="BackPack" />
        <div className='backpackPage-block__desc'>Osprey Перший рюкзак Osprey було виготовлено в Каліфорнії, в 1974 році, однією швейною машиною, ідеями однієї людини, з готовністю творити, розробляти нові дизайни та впроваджувати інновації в створення нових рюкзаків найвищої якості.</div>
        <div className="backpackPage-block__selector">
          <ul>
            { typeName.map((typeId, i) => (
              <li
                // className={activeType === typeId ? 'active' : ''}
                key={typeId}>
                {typeName[i]}
              </li>
            ))}
          </ul>
          <ul>
            { sizes.map((item, i) => (
              <li
                // onClick={() => setActiveSize(i)}
                // className={activeSize === i ? 'active' : ''}
                key={i}>
                {item} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="backpackPage-block__bottom">
          <div className="backpackPage-block__price">от {backpack.price} ₴</div>
          <div className="backpackPage button--outline button--add">
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

export default BackPackPage
