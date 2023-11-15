import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/backend/Layout';
import summaryAPI from '@/services/summaryRecordAPI';
import styles from '@/styles/backend/_SummaryList.module.scss';
import { Button } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

type DetailType = {
  userName: string,
  role: string,
  department: string,
  summaryRecordList: SummaryRecordType[],
  userId: string,
}

type SummaryRecordType = {
  establishTime: string,
  topic: string,
  summary: string,
  sid: string,
}

export default function ConsultationDetail() {
  const router = useRouter();
  const { status } = useSession();
  const { userId } = router.query;
  const [detailData, setDetailData] = useState<DetailType>();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
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
    }
  }, [router, status, userId]);

  return (
    <Layout>
      <div className={styles.head}>
        <h1>摘要紀錄</h1>
        <p>{detailData?.role}：{detailData?.userName}{' / '}{detailData?.department}</p>
      </div>
      <section>
        {detailData?.summaryRecordList.length === 0 ?
          <p>尚無紀錄</p> :
          detailData?.summaryRecordList.map((data, index) =>
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
            </article>)
        }
      </section>
    </Layout>
  );
}