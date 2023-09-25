import Layout from '@/components/frontend/Layout';
import { Button, Container, Textarea, Alert, AlertIcon, Tag } from '@chakra-ui/react';
import userAPI from '@/services/userAccountAPI';
import { useState } from 'react';
import { Title } from '@/components/frontend/Illustrators/titleSVG';
import { Monsters } from '@/components/frontend/Illustrators/monstersSVG';
import styles from '@/styles/frontend/_Story.module.scss';
import { FiBookmark, FiSend } from 'react-icons/fi';
import { HappyMonster } from '@/components/frontend/Illustrators/yellowSVG';
import summaryAPI from '@/services/summaryRecordAPI';

export default function Story() {
  const [isTell, setIsTell] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [story, setStory] = useState('');
  const [emotionData, setEmotionData] = useState([]);
  const [musicData, setMusicData] = useState([]);
  const handleStory = (event: any) => setStory(event?.target.value);

  async function tellStory() {
    if (story !== '') {
      setIsLoading(true);
      try {
        const response = await summaryAPI.postSummary({ 'prompt': story });

        setIsLoading(false);
        setEmotionData(response.data.value.split(','));
        setMusicData(response.data.musicList);
        setIsTell(true);
      } catch (err: any) {
        setIsLoading(false);
        alert(err.message);
      }
    } else {
      alert('請輸入文字');
    }
  }

  return (
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
            <HappyMonster />
          </div>
          <div className={styles.content}>
            <section>
              <h2 className={styles.title}>樹洞感應到您有的情緒...</h2>
              <div className={styles.tagGroup}>
                {emotionData.map((tag, index) =>
                  <div key={index} className={styles.tag}>{tag}</div>)
                }
              </div>
            </section>
            <section className={styles.playList}>
              <h2 className={styles.title}>推薦給您...</h2>
              {musicData.map((music, index) => (
                <article key={index} className={styles.list}>
                  <div className={styles.cover}>圖片</div>
                  <div>
                    <h3 className={styles.song}>{music.song}</h3>
                    <p>歌手</p>
                  </div>
                  <span className={styles.mark}><FiBookmark /></span>
                </article>
              ))}
            </section>
          </div>
          {/* <Alert status="warning" my={5}>
              <AlertIcon />注意：本系統並非心理諮商醫療診斷工具。如果您正面臨嚴重的心理健康問題，請立即尋求專業心理醫療服務。
            </Alert> */}
        </section>
      }
    </Layout>
  );
}