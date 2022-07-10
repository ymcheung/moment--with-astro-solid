import styles from '../styles/heardItem.module.css';

export default function HeardItem({media}) {
  const handleCreateIframe = (url, start) => {
    const containers = document.querySelectorAll('.heard');
    const songMeta = document.querySelector('.songMeta');
    const expand = document.getElementsByClassName(`expandEmbed ${url}`);
    const iframe = document.createElement('iframe');

    if (document.body.querySelector('iframe')) {
      const iframeToRemove = document.body.querySelector('iframe');

      containers.forEach((container) => {
        container.querySelectorAll('.expandEmbed').forEach(button => {
          if (!button.hasAttribute('disabled')) return;
          button.toggleAttribute('disabled');
        });
      });

      document.body.removeChild(iframeToRemove);
    }

    const iframeAttributes = {
      class: `${styles.player} ${url}`,
      src: `https://www.youtube.com/embed/${url}?start=${start ? start : 0}`,
      frameborder: 0,
      allow: 'gyroscope; picture-in-picture',
      allowfullscreen: true
    };

    const setAttributes = (element, attributes) => {
      Object.keys(attributes).forEach(attr => {
        element.setAttribute(attr, attributes[attr]);
      });
    }

    setAttributes(iframe, iframeAttributes);
    songMeta.parentNode.insertBefore(iframe, songMeta);

    Array.from(expand).forEach(button => {
      button.setAttribute('disabled', 'disabled');
    });
  };

  return (
    <ul class={styles.mediaList}>
      {
        media.map(({ name, year, url, start }) =>
          <li className={styles.listItem}>
            <span className={styles.mediaName}>{name}</span>
            <span className={styles.mediaYear}>{year}</span>
            {url &&
              <button
                className={`${styles.expand} expandEmbed ${url}`}
                type="button"
                onClick={() =>{handleCreateIframe(url, start)}}
                data-splitbee-event="點擊影片"
                data-splitbee-event-type={name}
              >
                <img className={styles.iconYoutube} src="/youtube.svg" alt="播放影片" />
              </button>
            }
          </li>
        )
      }
    </ul>
  );
}
