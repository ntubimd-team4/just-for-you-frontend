import FrontendLayout from '@/components/frontend/Layout';
import { useEffect, useState } from 'react';
import styles from '@/styles/frontend/_Story.module.scss';
import { FiSend } from 'react-icons/fi';
import summaryAPI from '@/services/summaryRecordAPI';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import recommendAPI from '@/services/recommendAPI';
import { Avatar, Button } from '@chakra-ui/react';
import MusicList from '@/components/frontend/MusicList';
import { PlayListType } from '@/ts/types/MusicList.type';
import Loading from '@/components/base/Loading';
import { IoReload } from 'react-icons/io5';

type ResDataType = {
  text: string,
  color: string,
  sid: string,
  musicList: PlayListType[],
  value: string,
  isHighLevel: boolean,
}

type DialogType = {
  img: string,
  role: string,
  context: string,
  userName?: string,
}

const DialogArea = ({ img, role, context, userName }: DialogType) => (
  <section className={`${styles.dialogWrap} ${role === 'student' && styles.studnet}`}>
    <Avatar src={img} size={{ 'base': 'sm', 'sm': 'md' }} />
    <div className={styles.dialog}>
      {(role === 'teacher' && userName) && <p>您好！{userName}</p>}
      {context}
    </div>
  </section>
);

export default function Story() {
  const { 'data': session, status } = useSession();
  const router = useRouter();
  const [isTell, setIsTell] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [story, setStory] = useState('');
  const [resData, setResData] = useState<ResDataType>();
  const [emotionText, setEmotionText] = useState('');
  const [musicData, setMusicData] = useState<PlayListType[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [router, status]);

  const handleStory = (event: any) => setStory(event?.target.value);

  const tellStory = async () => {
    if (story !== '') {
      setIsLoading(true);
      setMusicData([]);
      try {
        const response = await summaryAPI.postSummary({ 'prompt': story });

        setIsLoading(false);
        setResData(response.data);

        setMusicData(response.data.musicList);
        setEmotionText(response.data.text);
        setIsTell(true);
        setStory('');
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

  return (
    <FrontendLayout>
      <section className={styles.conatiner}>
        <div className={styles.chat}>
          {loading ?
            <DialogArea
              img={'/images/avatar.png'}
              role={'teacher'}
              context={'情緒辨識中...'}
            /> :
            <DialogArea
              img={'/images/avatar.png'}
              userName={session?.user?.name as string}
              role={'teacher'}
              context={isTell ? emotionText : '歡迎來到諮屬於你，你可以在這邊告訴我們您的煩惱...'}
            />
          }
          {musicData.length > 0 &&
            <>
              <DialogArea
                img={'/images/avatar.png'}
                role={'teacher'}
                context={'推薦給您以下音樂，希望您會喜歡！'}
              />
              <section className={styles.dialogWrap}>
                <Avatar size={{ 'base': 'sm', 'sm': 'md' }} src={'/images/avatar.png'} />
                <div>
                  <section className={`${styles.dialog} ${styles.music}`}>
                    <MusicList musicData={musicData} />
                  </section>
                  <span className={styles.reSendBtn} onClick={() => reRecommend()}>
                    重新推薦 <IoReload style={{ 'marginLeft': '0.5rem' }} />
                  </span>
                </div>
              </section>
            </>
          }
        </div>
        <div>
          <section className={styles.text}>
            <textarea value={story} onChange={(e: any) => handleStory(e)} cols={30}
              rows={2} className={styles.textarea} placeholder="您有甚麼煩惱呢？" />
            <Button className={`${styles.sendBtn} ${story !== '' ? styles.available : styles.disable}`}
              onClick={() => tellStory()} isLoading={loading}>
              <FiSend />
            </Button>
          </section>
        </div>
      </section>
      {loading && <Loading />}
    </FrontendLayout >
  );
}