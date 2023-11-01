import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/backend/Layout';
import summaryAPI from '@/services/summaryRecordAPI';
import styles from '@/styles/backend/_SummaryList.module.scss';
import { Button } from '@chakra-ui/react';

export default function ConsultationDetail() {
  const router = useRouter();
  const { userId } = router.query;
  const [detailData, setDetailData] = useState();

  useEffect(() => {
    const fetchSummaryData = async () => {
      if (userId) {
        try {
          const response = await summaryAPI.getSummary(userId);
          const data = response.data;

          setDetailData(data);
        } catch (error: any) {
          alert(error.message);
        }
      }
    };

    fetchSummaryData();
  }, [userId]);

  return (
    <Layout>
      <div className={styles.head}>
        <h1>摘要紀錄</h1>
        <p>{detailData?.userName} {detailData?.role} {detailData?.department}</p>
      </div>
      <section>
        {detailData?.summaryRecordList.length === 0 ?
          <p>尚無紀錄</p> :
          detailData?.summaryRecordList.map((data, index) =>
            <>
              <article className={styles.list} key={index}>
                <h2 className={styles.title}>{data.establishTime ? data.establishTime : '摘要時間'}</h2>
                <div className={styles.content}>
                  <section className={styles.text}>
                    <p>來訪主題：{data.topic}</p>
                    <p>摘要：{data.summary}</p>
                  </section>
                  <Button flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    _focus={{ 'bg': 'gray.200', }}
                    aria-label="詳細記錄"
                    onClick={() => router.push(`/consultation-manage/${detailData.userId}/${data.sid}`)}>
                    詳細記錄
                  </Button>
                </div>
              </article>
            </>)
        }
      </section>
    </Layout>
  );
}