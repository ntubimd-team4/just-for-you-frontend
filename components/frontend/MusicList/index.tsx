import styles from '@/styles/frontend/_MusicList.module.scss';
import { FaRegHeart } from 'react-icons/fa';
import YouTubeEmbed from '../YouTubeModal';
import { StoryResType } from '@/ts/types/MusicList.type';

export default function MusicList({ musicData }: {musicData: StoryResType[]}) {
  return (
    <section className={styles.playList}>
      {musicData.map((music, index) => (
        <article className={styles.list} key={index}>
          <div className={styles.numWrap}>
            <h3>{index + 1}</h3>
          </div>
          <div className={styles.coverWrap}>
            <div className={styles.cover}>
              <img src={music.thumbnails} alt="cover" />
            </div>
          </div>
          <div className={styles.contentWrap}>
            <h3>{music.song}</h3>
            <div className={styles.func}>
              <span className={styles.heart}><FaRegHeart /></span>
              <YouTubeEmbed embedId={music.link} />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}