import Layout from '@/components/backend/Layout';
import summaryAPI from '@/services/summaryRecordAPI';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/backend/_SummaryDetail.module.scss';

export default function ConsultationRecord() {
  const router = useRouter();
  const { sid } = router.query;
  const [detailData, setDetailData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (sid) {
        try {
          const response = await summaryAPI.getSummaryDetail(sid);
          const data = response.data;

          setDetailData(data);
        } catch (error: any) {
          alert(error.message);
        }
      }
    };

    fetchData();
  }, [sid]);

  return (
    <Layout>
      <div className={styles.head}>
        <h1>摘要紀錄</h1>
        <p>{detailData?.userName} {detailData?.role} {detailData?.department}</p>
      </div>
      <p>{detailData?.establishTime}</p>
      <p>諮商主題：{detailData?.topic}</p>
      <section className={styles.content}>
        <div className={styles.item}>
          <section className={styles.summary}>
            <h2>摘要：</h2>
            <p>{detailData?.summary}</p>
          </section>
          <section className={styles.origin}>
            <h2>原始訊息：</h2>
            <p>{detailData?.content}</p>
          </section>
        </div>
        <div className={styles.item}>
          <section className={styles.record}>
            <h2>諮商師紀錄：</h2>
          </section>
          <button className={styles.editBtn}>編輯紀錄</button>
        </div>
      </section>
    </Layout>
  );
}