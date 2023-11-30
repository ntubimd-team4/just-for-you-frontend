import React, { useState } from 'react';
import styles from '@/styles/frontend/_YoutubeEnbed.module.scss';
import { FiYoutube } from 'react-icons/fi';

const YouTubeEmbed = ({ embedId }:
  { embedId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (boo: boolean) => {
    setIsOpen(boo);
  };

  const handleVideoId = (musicId: string) => {
    const embedId = musicId.split('?v=')[1];

    return embedId;
  };

  return (
    <>
      <span className={styles.play} onClick={() => handleOpen(true)}>
        <FiYoutube />
      </span>
      {isOpen &&
        <section className={styles.container} onClick={() => handleOpen(false)}>
          <div className={styles.videoResponsive}>
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${handleVideoId(embedId)}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </section>
      }
    </>
  );
};

export default YouTubeEmbed;