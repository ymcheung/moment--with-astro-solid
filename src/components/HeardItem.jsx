import styles from '../styles/heardItem.module.scss';

export default function HeardItem({ children, name, year, url, start }) {
  return (
    <li className={styles.listItem}>
      <span className={styles.mediaName}>{name}</span>
      <span className={styles.mediaYear}>{year}</span>
      {children}
    </li>
  )
}
