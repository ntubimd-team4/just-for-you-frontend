import Layout from '@/components/frontend/Layout';
import MusicList from '@/components/frontend/MusicList';
import recommendAPI from '@/services/recommendAPI';
import styles from '@/styles/frontend/_MyMusic.module.scss';
import { PlayListType } from '@/ts/types/MusicList.type';
import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement, Select, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Profile from '@/components/frontend/Profile';

export default function MyMusic() {
  const router = useRouter();
  const { status } = useSession();
  const [recommendData, setRecommendData] = useState<PlayListType[]>([]);
  const [userTagList, setUserTagList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTag, setActiveTag] = useState('all');
  const [searchInputValue, setSearchInputValue] = useState('');
  const hint = '載入中';

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      const fetchRecordData = async () => {
        setLoading(true);
        try {
          const response = await recommendAPI.getAllRecord();
          const tagResponse = await recommendAPI.getUserTag();
          const data = response.data;
          const tagList = tagResponse.data;

          setRecommendData(data);
          setUserTagList(tagList);
        } catch (error: any) {
          alert(error.message);
        }
        setLoading(false);
      };

      fetchRecordData();
    }
  }, [router, status]);

  return (
    <Layout>
      <section className={styles.container}>
        <section className={styles.content}>
          <div className={styles.profile}>
            <Profile />
          </div>
          <div className={styles.musicList}>
            <Tabs>
              <TabList className={styles.tabGroup}>
                <div className={styles.tabList}>
                  <Tab>推薦紀錄</Tab>
                  <Tab>收藏紀錄</Tab>
                </div>
                <div className={styles.filterList}>
                  <Select placeholder="全部" size="sm" variant="filled">
                    {userTagList.map((data, index) => (
                      <option key={index} value={data.emotion_tag}>{data.description}</option>
                    ))}
                  </Select>
                  <InputGroup style={{ 'marginLeft': '1rem' }}>
                    <InputRightElement pointerEvents="none">
                      <SearchIcon />
                    </InputRightElement>
                    <Input variant="filled" size="sm" type="text" placeholder="請輸入歌名" />
                  </InputGroup>
                </div>
              </TabList>
            </Tabs>
            <MusicList musicData={recommendData} />
          </div>
        </section>
      </section>
    </Layout>
  );
}