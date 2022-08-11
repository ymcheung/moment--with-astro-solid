import styles from '../styles/playButton.module.scss';

export default function PlayButton({ name, isDisabled }, ...props) {
  return (
    <button className={styles.expand} type="button"
      disabled={isDisabled}
      data-splitbee-event="點擊影片"
      data-splitbee-event-type={name}
      {...props}
    >
      <img className={styles.iconYoutube} src="/youtube.svg" alt="播放影片" />
    </button>
  )
}
