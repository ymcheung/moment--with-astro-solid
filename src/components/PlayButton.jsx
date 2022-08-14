import styles from '../styles/playButton.module.scss';

export default function PlayButton({ name, isDisabled, url, handleClickPlay }) {
  return (
    <button className={styles.expand} type="button"
      disabled={isDisabled}
      // attr:disabled={isDisabled}
      data-splitbee-event="點擊影片"
      data-splitbee-event-type={name}
      onClick={() => handleClickPlay(url)}
    >
      <img className={styles.iconYoutube} src="/youtube.svg" alt="播放影片" />
    </button>
  )
}
