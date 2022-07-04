import { useState } from 'react'
import styles from './Featured.module.scss'
import left from '../../assets/slider/arrow-left.png'
import right from '../../assets/slider/arrow-right.png'

const Featured = () => {
  const [index, setIndex] = useState(0)
  const images = [
    '/img/slide/1.jpg',
    '/img/slide/2.jpg',
    '/img/slide/3.jpg',
    '/img/slide/4.jpg',
    '/img/slide/5.jpg',
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
        <div className={styles.wrapper} style={{ transform: `translateX(${-91 * index}vw)` }}>
          {images.map((img, i) => (
            <div className={styles.imgContainer} key={i}>
              <img src={img} alt="img" layout="fill" object-fit='contain' />
            </div>
          ))}
        </div>
        <div className={styles.arrowContainer} style={{ right: 0 }} onClick={() => slideImg('r')}>
          <img src={right} alt="right" />
        </div>
      </div>
    </div>
  )
}

export default Featured
