import styles from '../styles/playButton.module.scss';

export default function PlayButton(props) {
  return (
    <button className={styles.expand} type="button"
      disabled={props.disabled}
      data-splitbee-event="點擊影片"
      data-splitbee-event-type={props.name}
      onClick={() => props.handleClickPlay(props.url)}
    >
      <img className={styles.iconYoutube} src="/youtube.svg" alt="播放影片" />
    </button>
  )
}
