import { createSignal } from 'solid-js';
import styles from '../styles/heardItem.module.css';

export default function HeardItem({ name, year, url, start }) {
  return (
    <li className={styles.listItem}>
      <span className={styles.mediaName}>{name}</span>
      <span className={styles.mediaYear}>{year}</span>
      {url &&
        <button
          className={styles.expand}
          type="button"
          // onClick={() =>{handleCreateIframe(url, start)}}
          // disabled={}
          data-splitbee-event="點擊影片"
          data-splitbee-event-type={name}
        >
          <img className={styles.iconYoutube} src="/youtube.svg" alt="播放影片" />
        </button>
      }
    </li>
  )
}
