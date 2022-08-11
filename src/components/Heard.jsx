import { createStore } from 'solid-js/store';
import HeardItem from './HeardItem.jsx';
import PlayButton from './PlayButton.jsx';
import styles from '../styles/heard.module.scss';;

export default function Heard({ heard }) {
  const mediaWithUrl = heard.map(({ media }) =>
    media.filter(({ url }) => url).map(({ url }) => url)).flat(1);

  const initialState = mediaWithUrl.reduce((accumulator, value) => {
    return { ...accumulator, [value]: false };
  }, {});

  const [isDisabled, setIsDisabled] = createStore(initialState);

  const handleClickPlay = (url) => {
    setIsDisabled({ ...initialState, [url]: true })
  }

  return (
    <>
      <strong className={styles.title}>出現在</strong>
      <ul className={styles.heardList}>
        {heard.map(({ emoji, media }) =>
        <li>
          <strong className={styles.mediaEmoji}>{emoji}</strong>
          <ul className={styles.mediaList}>
            {
            media.map(({ name, year, url, start }) => (
            <HeardItem name={name} year={year} url={url} start={start}>
              {url &&
              <PlayButton name={name} isDisabled={isDisabled[name]} onClick={() => handleClickPlay(url)} />
              }
            </HeardItem>
            ))
            }
          </ul>
        </li>
        )
        }
      </ul>
    </>
  )
}
