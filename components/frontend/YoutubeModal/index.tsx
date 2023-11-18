import React from 'react';
import styles from '@/styles/frontend/_YoutubeEnbed.module.scss';

const YoutubeEmbed = ({ embedId }:
    { embedId: string }) =>
  (
    <section className={styles.container}>
      <div className={styles.videoResponsive}>
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${embedId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </section>
  );

export default YoutubeEmbed;