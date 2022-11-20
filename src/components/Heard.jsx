import { For, createSignal } from 'solid-js';
import { createStore, unwrap } from 'solid-js/store';
import { Portal } from 'solid-js/web';
import HeardItem from './HeardItem.jsx';
import PlayButton from './PlayButton.jsx';
import styles from '../styles/heard.module.scss';

export default function Heard(props) {
  const mediaWithUrl = props.heard.map(({ media }) =>
    media.filter(({ url }) => url).map(({ url }) => url)).flat(1);

  const initialState = mediaWithUrl.reduce((accumulator, value) => {
    return { ...accumulator, [value]: false };
  }, {});

  const [isDisabled, setIsDisabled] = createStore({ ...initialState });
  const [showIframe, setShowIframe] = createSignal(false);

  const handleCloseIframe = () => {
    setShowIframe(false);
    setIsDisabled({ ...initialState })
  }

  const handleClickPlay = (url) => {
    setShowIframe(false);
    setIsDisabled({ ...initialState, [url]: true });
    setShowIframe(true);
  }

  const Player = () => {

    const youtubeUrls = unwrap(isDisabled);
    const slug = Object.keys(youtubeUrls).find(key => youtubeUrls[key] === true);

    return (
      <section className={styles.player}>
        <div className={styles.playerAction}>
          <button className={styles.close} onClick={handleCloseIframe}>x</button>
        </div>
        <iframe className={styles.playerIframe} src={`https://www.youtube.com/embed/${slug}`} allow="gyroscope; picture-in-picture" allowFullScreen />
      </section>
    )
  }

  return (
    <>
      <strong className={styles.title}>出現在</strong>
      <ul className={styles.heardList}>
        <For each={props.heard}>
          {({ emoji, media }) =>
            <li>
              <strong className={styles.mediaEmoji}>{emoji}</strong>
              <ul className={styles.mediaList}>
                <For each={media}>
                  {({ name, year, url, start }) =>
                    <HeardItem name={name} year={year}>
                      {url &&
                        <PlayButton
                          name={name}
                          disabled={isDisabled[url]}
                          url={url}
                          start={start}
                          handleClickPlay={handleClickPlay}
                        />
                      }
                    </HeardItem>
                  }
                </For>
              </ul>
            </li>
          }
        </For>
      </ul>
      <Portal mount={document.getElementById('song')}>
        {showIframe() && <Player />}
      </Portal>
    </>
  )
}
