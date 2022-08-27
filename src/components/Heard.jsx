import { For, onMount, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
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

  const handleClickPlay = (url) => {
    setIsDisabled({ ...initialState, [url]: true });
    if (!showIframe()) {
      setShowIframe(true);
    }
  }

  const handleCloseIframe = () => {
    setShowIframe(false);
  }

  const Player = () => {
    return (
      <section className={styles.player}>
        <div className={styles.playerAction}>
          <button className={styles.close} onClick={handleCloseIframe}>x</button>
        </div>
        <iframe className={styles.playerIframe} />
      </section>
    )
  }

  // let dialog;

  // const handleModalOpen = () => {
  //   onMount(() => dialog.showModal());
  // };

  // const handleModalClose = () => {
  //   onMount(() => dialog.close());
  //   setIsDisabled({ ...initialState });
  // };

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
      {console.log(showIframe())}
      {showIframe() && <Player />}
    </>
  )
}
