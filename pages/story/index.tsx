import Layout from '@/components/frontend/Layout';
import { useState } from 'react';
import { Title } from '@/components/frontend/Illustrators/titleSVG';
import { Monsters } from '@/components/frontend/Illustrators/monstersSVG';
import styles from '@/styles/frontend/_Story.module.scss';
import { FiBookmark, FiSend } from 'react-icons/fi';
import { HappyMonster } from '@/components/frontend/Illustrators/yellowSVG';
import summaryAPI from '@/services/summaryRecordAPI';
import Loading from '@/components/frontend/Loading';
import { TfiReload } from 'react-icons/tfi';

export default function Story() {
  const [isTell, setIsTell] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [story, setStory] = useState('');
  const [hint, setHint] = useState<string>('載入中');
  const [emotionData, setEmotionData] = useState([]);
  const [musicData, setMusicData] = useState([]);
  const handleStory = (event: any) => setStory(event?.target.value);

  const tellStory = async () => {
    if (story !== '') {
      setIsLoading(true);
      setHint('情緒辨識中');
      try {
        const response = await summaryAPI.postSummary({ 'prompt': story });

        setIsLoading(false);
        setEmotionData(response.data.value);
        setMusicData(response.data.musicList);
        setIsTell(true);
      } catch (err: any) {
        setIsLoading(false);
        alert(err.message);
      }
    } else {
      alert('請輸入文字');
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
                  <h2 className={styles.title}>您當前可能有的情緒</h2>
                  <div className={styles.tagGroup}>
                    {emotionData}
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
                      <img src={music.thumbnails} alt="" />
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
              <button className={styles.reSendBtn} onClick={() => tellStory()}>
                <TfiReload style={{ 'marginRight': '10px' }}/>重新推薦
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