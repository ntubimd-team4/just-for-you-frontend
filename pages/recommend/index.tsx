import { ChangeEvent, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Layout from '@/components/frontend/Layout';
import recommendAPI from '@/services/recommendAPI';
import styles from '@/styles/frontend/_Recommend.module.scss';
import Loading from '@/components/frontend/Loading';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FiYoutube } from 'react-icons/fi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import YouTubeEmbed from '@/components/frontend/YouTubeModal';

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
  const [recommendData, setRecommendData] = useState<PlayListType[]>([]);
  const [userTagList, setUserTagList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEndedOpen, setIsEndedOpen] = useState(false);
  const [musicId, setMusicId] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const [searchInputValue, setSearchInputValue] = useState('');
  const hint = '載入中';

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      const fetchRecordData = async () => {
        setLoading(true);
        try {
          const response = await recommendAPI.getAllRecord();
          const tagResponse = await recommendAPI.getUserTag();
          const data = response.data;
          const tagList = tagResponse.data;

          setRecommendData(data);
          setUserTagList(tagList);
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
        const responseMsg = await recommendAPI.patchCollention({ 'rid': rid });
        const response = await recommendAPI.getAllRecord();
        const data = response.data;

        await setRecommendData(data);
        await alert(responseMsg.message);
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

  const handleActiveTag = (tag: string) => {
    setActiveTag(tag);
    const fetchData = async () => {
      if (tag === 'all') {
        try {
          const response = await recommendAPI.getAllRecord();

          setRecommendData(response.data);
        } catch (error: any) {
          alert(error.message);
        }
      } else {
        try {
          const response = await recommendAPI.getRecordByTag(tag);

          setRecommendData(response.data);
        } catch (error: any) {
          alert(error.message);
        }
      }
    };

    fetchData();
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const getQueryData = () => {
    const fetchData = async () => {
      try {
        const response = await recommendAPI.getRecordByQuery(searchInputValue);

        setRecommendData(response.data);
      } catch (error: any) {
        alert(error.message);
      }
    };

    fetchData();
  };

  return (
    <>
      <Layout>
        <section className={styles.container}>
          <h1 className={styles.pageTitle}>推薦紀錄</h1>
          <section className={styles.row}>
            <section className={styles.item}>
              <div className={styles.timeline}>
                <section className={styles.playList}>
                  {recommendData.map((music, index) => (
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
                          <span className={styles.like}
                            onClick={() => handleCollection(music.rid)}>
                            {music.isCollection ?
                              <FaHeart className={styles.isCollect} /> :
                              <FaRegHeart />}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </section>
              </div>
            </section>
            <section className={`${styles.item} ${styles.searchWrp}`}>
              <div>
                <div className={styles.input}>
                  <input type="text" value={searchInputValue} placeholder="請輸入歌名" onChange={e => handleSearch(e)} />
                  <button disabled={searchInputValue === ''} className={styles.btn} onClick={() => getQueryData()}>
                    <FaSearch />
                  </button>
                </div>
                <div className={styles.radioGroup}>
                  <h3>情緒類型：</h3>
                  {[{ 'emotion_tag': 'all', 'description': '全部' }, ...userTagList].map((data, index) => (
                    <span key={index} className={`${styles.tag} ${activeTag === data.emotion_tag ? styles.active : ''}`}
                      onClick={() => handleActiveTag(data.emotion_tag)}>
                      {data.description}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </section>
        </section>
      </Layout>
      {isEndedOpen && <YouTubeEmbed embedId={musicId as string} />}
      {loading && <Loading hint={hint} />}
    </>
  );
}