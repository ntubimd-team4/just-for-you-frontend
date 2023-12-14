import styles from '@/styles/frontend/_MusicList.module.scss';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import YouTubeEmbed from '../YouTubeModal';
import { PlayListType } from '@/ts/types/MusicList.type';
import recommendAPI from '@/services/recommendAPI';
import { useEffect, useState } from 'react';

export default function MusicList({ musicData }: {musicData: PlayListType[]}) {
  const [listData, setListData] = useState<PlayListType[]>([]);

  useEffect(() => {
    if (musicData) {
      setListData(musicData);
    }
  }, [musicData]);

  const patchCollection = async (rid: number) => {
    try {
      await recommendAPI.patchCollention({ 'rid': rid });

      const updatedArray = listData.map(item => {
        if (item.rid === rid) {
          return { ...item, 'isCollection': !item.isCollection };
        }
        return item;
      });

      await setListData(updatedArray);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <section className={styles.playList}>
      {listData.map((music, index) => (
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
              <span className={`${styles.heart} ${music.isCollection && styles.isCollect}`}
                onClick={() => patchCollection(music.rid)}>
                {music.isCollection ? <FaHeart /> : <FaRegHeart />}
              </span>
              <YouTubeEmbed embedId={music.link} />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}