import Layout from '@/components/frontend/Layout';
import { useEffect, useState } from 'react';
import { Title } from '@/components/frontend/Illustrators/titleSVG';
import { Monsters } from '@/components/frontend/Illustrators/monstersSVG';
import styles from '@/styles/frontend/_Story.module.scss';
import { FiSend, FiYoutube } from 'react-icons/fi';
import { TfiReload } from 'react-icons/tfi';
import summaryAPI from '@/services/summaryRecordAPI';
import Loading from '@/components/frontend/Loading';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import recommendAPI from '@/services/recommendAPI';
import YoutubeEmbed from '@/components/frontend/YoutubeModal';
import Monster from '@/components/frontend/Monster';

type StoryResType = {
  thumbnails: string,
  link: string,
  song: string,
}

type ResDataType = {
  text: string,
  color: string,
  sid: string,
  musicList: StoryResType[],
  value: string,
}

export default function Story() {
  const { 'data': session, status } = useSession();
  const router = useRouter();
  const [isTell, setIsTell] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [isEndedOpen, setIsEndedOpen] = useState(false);
  const [story, setStory] = useState('');
  const [musicId, setMusicId] = useState('');
  const [hint, setHint] = useState<string>('載入中');
  const [resData, setResData] = useState<ResDataType>();
  const [emotionText, setEmotionText] = useState('');
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
        setResData(response.data);

        setMusicData(response.data.musicList);
        setEmotionText(response.data.text);
        setIsTell(true);
      } catch (err: any) {
        setIsLoading(false);
        alert(err.message);
      }
    } else {
      alert('請輸入文字');
    }
  };

  const reRecommend = async () => {
    setIsLoading(true);
    setHint('重新推薦音樂給您');
    try {
      const response = await recommendAPI.getReRecommend(resData?.sid);

      setIsLoading(false);
      setMusicData(response.data.musicList);
      setEmotionText(response.data.text);
      setIsTell(true);
    } catch (err: any) {
      setIsLoading(false);
      alert(err.message);
    }
  };

  const videoEnbed = (musicId: string) => {
    const embedId = musicId.split('?v=')[1];

    setIsEndedOpen(true);
    setMusicId(embedId);
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
                    <br />
                    <p>我們想推薦您幾首歌，讓您聽聽！</p>
                  </div>
                </div>
              </div>
              <Monster color={resData?.color || ''} />
            </div>
            <section className={styles.recommendList}>
              <section className={styles.playList}>
                <div className={styles.head}>
                  <h3>推薦清單</h3>
                  <span className={styles.reSendBtn} onClick={() => reRecommend()}>
                    <TfiReload />
                  </span>
                </div>
                {musicData.map((music, index) => (
                  <article className={styles.list} key={index}>
                    <div className={styles.numWrap}>
                      <h3>{index + 1}</h3>
                    </div>
                    <div className={styles.coverWrap}>
                      <div className={styles.cover}>
                        <img src={music.thumbnails} alt="cover" />
                      </div>
                    </div>
                    <div className={styles.contentWrap}>
                      <h3 className={styles.song}>{music.song}</h3>
                      <div className={styles.func}>
                        <span className={styles.play} onClick={() => videoEnbed(music.link)}>
                          <FiYoutube />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            </section>
          </section>
        }
      </Layout>
      {isEndedOpen && <YoutubeEmbed embedId={musicId as string} />}
      {loading && <Loading hint={hint} />}
    </>
  );
}