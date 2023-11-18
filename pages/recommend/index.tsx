import { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Layout from '@/components/frontend/Layout';
import recommendAPI from '@/services/recommendAPI';
import styles from '@/styles/frontend/_Recommend.module.scss';
import Loading from '@/components/frontend/Loading';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FiHeart, FiYoutube } from 'react-icons/fi';
import YoutubeEmbed from '@/components/frontend/YoutubeModal';

type RecommendType = {
  establishTime: string;
  playList: PlayListType[];
}

type PlayListType = {
  rid: number;
  isCollection: boolean;
  emotionTag: number;
  link: string;
  song: string;
  thumbnails: string;
}

export default function MyRecommend() {
  const router = useRouter();
  const { status } = useSession();
  const [recommendData, setRecommendData] = useState<RecommendType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEndedOpen, setIsEndedOpen] = useState(false);
  const [musicId, setMusicId] = useState('');
  const hint = '載入中';

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      const fetchRecordData = async () => {
        setLoading(true);
        try {
          const response = await recommendAPI.getAllRecord();
          const data = response.data;

          setRecommendData(data);
        } catch (error: any) {
          alert(error.message);
        }
        setLoading(false);
      };

      fetchRecordData();
    }
  }, [router, status]);

  const handleCollection = (rid: any) => {
    const fetchData = async () => {
      try {
        await recommendAPI.patchCollention({ 'rid': rid });
        const response = await recommendAPI.getAllRecord();
        const data = response.data;

        setRecommendData(data);
        alert('收藏成功');
      } catch (error: any) {
        alert(error.message);
      }
    };

    fetchData();
  };

  const videoEnbed = (musicId: string) => {
    const embedId = musicId.split('?v=')[1];

    setIsEndedOpen(true);
    setMusicId(embedId);
  };

  return (
    <>
      <Layout>
        <section className={styles.container}>
          <h1 className={styles.pageTitle}>推薦紀錄</h1>
          <section className={styles.row}>
            <div className={styles.item}>
              {recommendData.map((data, index) =>
                <div className={styles.timeline} key={index}>
                  <p className={styles.time}>{data.establishTime}</p>
                  <section className={styles.playList}>
                    {data.playList.map((music, index) => (
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
                          <h3 className={styles.song}>{music.song}</h3>
                          <div className={styles.func}>
                            <span className={styles.play} onClick={() => videoEnbed(music.link)}>
                              <FiYoutube />
                            </span>
                            <span className={styles.like}>
                              <FiHeart />
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </section>
                </div>)}
            </div>
            <div className={`${styles.item} ${styles.search}`}>搜尋框</div>
          </section>
        </section>
      </Layout>
      {isEndedOpen && <YoutubeEmbed embedId={musicId as string} />}
      {loading && <Loading hint={hint} />}
    </>
  );
}