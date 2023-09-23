import { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Layout from '@/components/frontend/Layout';
import recommendAPI from '@/services/recommendAPI';
import styles from '@/styles/frontend/_Recommend.module.scss';

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
}

export default function MyRecommend() {
  const [recommendData, setRecommendData] = useState<RecommendType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await recommendAPI.getAllRecord();
        const data = response.data;

        setRecommendData(data);
      } catch (error: any) {
        alert(error.message);
      }
    })();
  }, []);

  const handleCollection = (rid: any) => {
    (async () => {
      try {
        await recommendAPI.patchCollention({ 'rid': rid });
        const response = await recommendAPI.getAllRecord();
        const data = response.data;

        setRecommendData(data);
        alert('收藏成功');
      } catch (error: any) {
        alert(error.message);
      }
    })();
  };

  return (
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
                    <img src="https://i.pinimg.com/564x/b0/fd/92/b0fd92d7f42f56e3c45ae475831e927a.jpg" alt="" />
                  </div>
                  <div className={styles.head}>
                    <h6 className={styles.title}>{list.song}</h6>
                    <span className={styles.star} onClick={() => handleCollection(list.rid)}>
                      {list.isCollection ? <FaStar /> : <FaRegStar />}
                    </span>
                  </div>
                  <div className={styles.tag}>
                    tag
                  </div>
                </div>)}
            </div>
          </div>)}
      </section>
    </Layout>
  );
}