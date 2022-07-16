import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addItem, selectorCartItemById } from '../../redux/slices/cartSlice'
import { CartItemType } from '../../redux/slices/cartSliceTypes'

export type BackPackBlockProps = {
  id: string
  title: string
  price: number
  count: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

const typeName:string[] = ['чоловічі', 'жіночі']

const BackPackBlock:FC<BackPackBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)


  const dispatch = useDispatch()
  const cartItem = useSelector(selectorCartItemById(id))
  const addCount = cartItem ? cartItem.count : 0

  const onClickAdd = () => {
  const item: CartItemType = {
    id,
    title,
    price,
    imageUrl,
    size: sizes[activeSize],
    type: typeName[activeType],
    count: 0

  }
  dispatch(addItem(item))
}

  return (
    <div className="backpack-block-wrapper">
      <div className="backpack-block">
        <Link key={id} to={`/backpack/${id}`}>
        <img className="backpack-block__image" src={imageUrl} alt="BackPack" />
        </Link>
        <h4 className="backpack-block__title">{title}</h4>
        <div className="backpack-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}
                key={typeId}>
                {typeName[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? 'active' : ''}
                key={size}>
                {size} літрів
              </li>
            ))}
          </ul>
        </div>
        <div className="backpack-block__bottom">
          <div className="backpack-block__price">від {price} ₴</div>
          <div onClick={onClickAdd} className="button button--outline button--add">
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
            {addCount > 0 ? <i>{addCount}</i> : ' '}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackPackBlock
