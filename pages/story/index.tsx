import Layout from '@/components/frontend/Layout';
import { useEffect, useState } from 'react';
import { Title } from '@/components/frontend/Illustrators/titleSVG';
import { Monsters } from '@/components/frontend/Illustrators/monstersSVG';
import styles from '@/styles/frontend/_Story.module.scss';
import { FiBookmark, FiSend } from 'react-icons/fi';
import { HappyMonster } from '@/components/frontend/Illustrators/yellowSVG';
import summaryAPI from '@/services/summaryRecordAPI';
import Loading from '@/components/frontend/Loading';
import { TfiReload } from 'react-icons/tfi';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import recommendAPI from '@/services/recommendAPI';

type StoryResType = {
  thumbnails: string,
  link: string,
  song: string,
}

export default function Story() {
  const { 'data': session, status } = useSession();
  const router = useRouter();
  const [isTell, setIsTell] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [story, setStory] = useState('');
  const [hint, setHint] = useState<string>('載入中');
  const [sid, setSid] = useState();
  const [emotionText, setEmotionText] = useState('');
  const [emotionData, setEmotionData] = useState([]);
  const [musicData, setMusicData] = useState<StoryResType[]>([]);
  const handleStory = (event: any) => setStory(event?.target.value);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [router, status]);

  const tellStory = async () => {
    if (story !== '') {
      setIsLoading(true);
      setHint('情緒辨識中');
      try {
        const response = await summaryAPI.postSummary({ 'prompt': story });

        setIsLoading(false);
        setEmotionData(response.data.value);
        setMusicData(response.data.musicList);
        setEmotionText(response.data.text);
        setSid(response.data.sid);
        setIsTell(true);
      } catch (err: any) {
        setIsLoading(false);
        alert(err.message);
      }
    } else {
      alert('請輸入文字');
    }
  };

  const ReRecommend = async () => {
    setIsLoading(true);
    setHint('重新推薦音樂給您');
    try {
      const response = await recommendAPI.getReRecommend(sid);

      setIsLoading(false);
      setMusicData(response.data.musicList);
      setEmotionText(response.data.text);
      setIsTell(true);
    } catch (err: any) {
      setIsLoading(false);
      alert(err.message);
    }
  };

  return (
    <>
      <Layout>
        {!isTell ?
          <section className={styles.storyConatiner}>
            <Title />
            <div>
              <Monsters />
              <section className={styles.text}>
                <textarea onChange={(e: any) => handleStory(e)} cols={30} rows={2} className={styles.textarea} placeholder="您有甚麼煩惱呢？" />
                <button className={`${styles.sendBtn} ${story !== '' ? styles.available : styles.disable}`} onClick={() => tellStory()}><FiSend /></button>
              </section>
            </div>
          </section> :
          <section className={styles.responseContainer}>
            <div className={styles.role}>
              <div className={styles.speechBubble}>
                <div className={styles.content}>
                  <h2 className={styles.title}>Hello!{' '}{session?.user?.name}</h2>
                  <div className={styles.tagGroup}>
                    {emotionText}
                  </div>
                </div>
              </div>
              <HappyMonster />
            </div>
            <section className={styles.recommendList}>
              <h2 className={styles.title}>推薦給您</h2>
              <section className={styles.playList}>
                {musicData.map((music, index) => (
                  <article key={index} className={styles.list}>
                    <div className={styles.cover}>
                      <img src={music.thumbnails} alt="cover" />
                    </div>
                    <div className={styles.wrap}>
                      <a href={music.link} target="_blank">
                        <h3 className={styles.song}>{music.song}</h3>
                      </a>
                      <span className={styles.mark}><FiBookmark /></span>
                    </div>
                  </article>
                ))}
              </section>
              <button className={styles.reSendBtn} onClick={() => ReRecommend()}>
                <TfiReload style={{ 'marginRight': '10px' }} />重新推薦
              </button>
            </section>
            {/* <Alert status="warning" my={5}>
              <AlertIcon />注意：本系統並非心理諮商醫療診斷工具。如果您正面臨嚴重的心理健康問題，請立即尋求專業心理醫療服務。
            </Alert> */}
          </section>
        }
      </Layout>
      {loading && <Loading hint={hint} />}
    </>
  );
}