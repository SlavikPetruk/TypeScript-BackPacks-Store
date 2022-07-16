import { useState } from 'react'
import styles from './Featured.module.scss'
import left from '../../assets/slider/arrow-left.png'
import right from '../../assets/slider/arrow-right.png'
import { Link } from 'react-router-dom'

const Featured = () => {
  const [index, setIndex] = useState(0)
  const images = [
    { img: '/img/slide/1.jpg', url: 'backpack/5' },
    { img: '/img/slide/2.jpg', url: 'backpack/6' },
    { img: '/img/slide/3.jpg', url: 'backpack/7' },
    { img: '/img/slide/4.jpg', url: 'backpack/8' },
    { img: '/img/slide/5.jpg', url: 'backpack/9' },
  ]

  const slideImg = (dir) => {
    if (dir === 'l') {
      setIndex(index !== 0 ? index - 1 : (index = images.length - 1))
    }
    if (dir === 'r') {
      setIndex(index !== images.length - 1 ? index + 1 : (index = 0))
    }
  }

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.container}>
        <div className={styles.arrowContainer} style={{ left: 0 }} onClick={() => slideImg('l')}>
          <img src={left} alt="left" />
        </div>
        <div className={styles.wrapper} style={{ transform: `translateX(${-1000 * index}px)` }}>
          {images.map((item, i) => (
            <div className={styles.imgContainer} key={i}>
              <Link to={item.url}>
                <button className={styles.btnSlide}>Переглянути</button>
              </Link>
              <img src={item.img} alt="img" layout="fill" object-fit="contain" />
            </div>
          ))}
        </div>
        <div className={styles.arrowContainer} style={{ right: 30 }} onClick={() => slideImg('r')}>
          <img src={right} alt="right" />
        </div>
      </div>
    </div>
  )
}

export default Featured
