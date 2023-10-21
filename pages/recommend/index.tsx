import { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Layout from '@/components/frontend/Layout';
import recommendAPI from '@/services/recommendAPI';
import styles from '@/styles/frontend/_Recommend.module.scss';
import Loading from '@/components/frontend/Loading';

type RecommendType = {
  establishTime: string;
  playList: PlayListType[];
  thumbnails: string;
}

type PlayListType = {
  rid: number;
  isCollection: boolean;
  emotionTag: number;
  link: string;
  song: string;
}

export default function MyRecommend() {
  const [recommendData, setRecommendData] = useState<RecommendType[]>([]);
  const [hint, setHint] = useState('載入中');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, []);

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

  return (
    <>
      <Layout>
        <section className={styles.container}>
          <h1 className={styles.pageTitle}>推薦紀錄</h1>
          {recommendData.map((data, index) =>
            <div className={styles.timeline} key={index}>
              <p className={styles.time}>{data.establishTime}</p>
              <div className={styles.list}>
                {data.playList.map((list, index) =>
                  <div className={styles.content} key={index}>
                    <div className={styles.cover}>
                      <img src={list.thumbnails} alt="" />
                    </div>
                    <div className={styles.head}>
                      <h6 className={styles.title}>{list.song}</h6>
                      <span className={styles.star} onClick={() => handleCollection(list.rid)}>
                        {list.isCollection ? <FaStar /> : <FaRegStar />}
                      </span>
                    </div>
                  </div>)}
              </div>
            </div>)}
        </section>
      </Layout>
      {loading && <Loading hint={hint} />}
    </>
  );
}