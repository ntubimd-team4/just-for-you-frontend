import { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Layout from '@/components/frontend/Layout';
import recommendAPI from '@/services/recommendAPI';
import styles from '@/styles/frontend/_Recommend.module.scss';
import Loading from '@/components/frontend/Loading';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

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