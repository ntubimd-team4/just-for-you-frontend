import BackendLayout from '@/components/backend/Layout';
import summaryAPI from '@/services/summaryRecordAPI';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from '@/styles/backend/_SummaryDetail.module.scss';
import { useSession } from 'next-auth/react';
import consultationAPI from '@/services/consultationAPI';

type DetailType = {
  userName: string,
  role: string,
  department: string,
  establishTime: string,
  topic: string,
  emotion: string,
  summary: string,
  content: string,
  consultationContent: string,
  sid: string,
}

export default function ConsultationRecord() {
  const router = useRouter();
  const { status } = useSession();
  const { sid } = router.query;
  const [detailData, setDetailData] = useState<DetailType>();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [recordContext, setRecordContext] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      const fetchData = async () => {
        if (sid) {
          try {
            const response = await summaryAPI.getSummaryDetail(sid);
            const data = response.data;

            setDetailData(data);
            setRecordContext(data.consultationContent === null ? '' : data.consultationContent);
          } catch (error: any) {
            alert(error.message);
          }
        }
      };

      fetchData();
    }
  }, [router, sid, status]);

  const handleRecord = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRecordContext(e.target.value);
  };

  const confirmEdit = (sid: string) => {
    const editReord = async () => {
      try {
        const response = await consultationAPI.patchConsultation({ sid, 'content': recordContext });

        await alert(response.message);
        router.reload();
      } catch (error: any) {
        alert(error.message);
      }
    };

    editReord();
  };

  const cancelEdit = () => {
    setIsEditOpen(false);
  };

  const handleDate = (establishTime: string) => {
    const dateArray = establishTime.split(' ')[0];
    const timeArray = establishTime.split(' ')[1];
    const year = dateArray.split('-')[0];
    const month = dateArray.split('-')[1];
    const date = dateArray.split('-')[2];
    const hour = timeArray.split(':')[0];
    const min = timeArray.split(':')[1];
    const result = `${year}年${month}月${date}日 ${hour}點${min}分`;

    return result;
  };

  return (
    <BackendLayout>
      <div className={styles.head}>
        <h1>摘要紀錄</h1>
        <p>{detailData?.role}：{detailData?.userName}{' / '}{detailData?.department ? detailData?.department : '尚無科系'}</p>
      </div>
      <p>{detailData && handleDate(detailData?.establishTime)}</p>
      <p>情緒：{detailData?.emotion}</p>
      <p>諮商主題：{detailData?.topic}</p>
      <section className={styles.content}>
        <div className={styles.row}>
          <section className={styles.item}>
            <h2>摘要：</h2>
            <p>{detailData?.summary}</p>
          </section>
          <section className={styles.item}>
            <h2>原始訊息：</h2>
            <p>{detailData?.content}</p>
          </section>
        </div>
        <div className={styles.row}>
          <section className={styles.item}>
            <section className={styles.record}>
              <h2>諮商師紀錄：</h2>
              {isEditOpen ? <textarea value={recordContext} onChange={e => handleRecord(e)} className={styles.recordArea} placeholder="請輸入諮商紀錄..." name="" id="" cols={30} rows={10} /> :
                <p>{detailData?.consultationContent === null ? '尚無諮商紀錄' :
                  detailData?.consultationContent}</p>
              }
            </section>
          </section>
          {isEditOpen ?
            <div>
              <button className={styles.editBtn}
                onClick={() => confirmEdit(detailData?.sid as string)}>
                確定編輯
              </button>
              <button className={styles.editBtn} onClick={() => cancelEdit()}>取消編輯</button>
            </div> :
            <button className={styles.editBtn} onClick={() => setIsEditOpen(true)}>編輯紀錄</button>}
        </div>
      </section>
    </BackendLayout>
  );
}