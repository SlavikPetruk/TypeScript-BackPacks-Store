import { Link } from 'react-router-dom'
import { FC } from 'react'
import cartEmptyImg from '../assets/empty_cart.png'

export const CartEmpty: FC = () => (
  <div className="cart cart--empty">
    <h2>
      Корзина пуста <span>😕</span>
    </h2>
    <p>
      <br />
      Для того, щоб замовляти пікцу, перейди на головну сторінку.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Повернуться назад</span>
    </Link>
  </div>
)
