import { FC } from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock:FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Нічого не знайдено
      </h1>
      <p className={styles.description}>
      Нажаль дана сторінка відсутня у нашому інтернет-магазині
      </p>
    </div>
  )
}

export default NotFoundBlock;
