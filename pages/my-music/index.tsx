import FrontendLayout from '@/components/frontend/Layout';
import MusicList from '@/components/frontend/MusicList';
import recommendAPI from '@/services/recommendAPI';
import styles from '@/styles/frontend/_MyMusic.module.scss';
import { PlayListType } from '@/ts/types/MusicList.type';
import { SearchIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, Select, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import Profile from '@/components/frontend/Profile';
import Loading from '@/components/base/Loading';

type UserTagList = {
  emotion_tag: string,
  description: string,
}

const recommendType = 0;
const collectionType = 1;

export default function MyMusic() {
  const router = useRouter();
  const { status } = useSession();
  const [listData, setListData] = useState<PlayListType[]>([]);
  const [userTagList, setUserTagList] = useState<UserTagList[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [listType, setListType] = useState(recommendType);

  const fetchRecommendData = async () => {
    setLoading(true);
    try {
      const response = await recommendAPI.getAllRecord();
      const data = response.data;

      setListData(data);
    } catch (error: any) {
      alert(error.message);
    }
    setLoading(false);
  };

  const fetchCollectionData = async () => {
    setLoading(true);
    try {
      const response = await recommendAPI.getCollention();
      const data = response.data;

      setListData(data);
    } catch (error: any) {
      alert(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      if (listType === recommendType) {
        fetchRecommendData();
      } else {
        fetchCollectionData();
      }
    }
  }, [listType, router, status]);

  useEffect(() => {
    const fetchTagList = async () => {
      try {
        const tagResponse = await recommendAPI.getUserTag();
        const tagList = tagResponse.data;

        setUserTagList(tagList);
      } catch (error: any) {
        alert(error.message);
      }
    };

    if (status === 'authenticated') {
      fetchTagList();
    }
  }, [status]);

  const handleActiveTag = (e: ChangeEvent<HTMLSelectElement>) => {
    const tag = e.target.value;

    const fetchData = async () => {
      if (tag === 'all') {
        fetchRecommendData();
      } else {
        try {
          const response = await recommendAPI.getRecordByTag(tag);

          setListData(response.data);
        } catch (error: any) {
          alert(error.message);
        }
      }
    };

    fetchData();
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const getQueryData = () => {
    const fetchData = async () => {
      try {
        const response = await recommendAPI.getRecordByQuery(searchInputValue);

        setListData(response.data);
      } catch (error: any) {
        alert(error.message);
      }
    };

    fetchData();
  };

  return (
    <FrontendLayout>
      <section className={styles.container}>
        <section className={styles.content}>
          <div className={styles.profile}>
            <Profile />
          </div>
          <div className={styles.musicList}>
            <Tabs colorScheme="teal">
              <TabList className={styles.tabGroup}>
                <div className={styles.tabList}>
                  <Tab onClick={() => setListType(recommendType)}>推薦紀錄</Tab>
                  <Tab onClick={() => setListType(collectionType)}>收藏紀錄</Tab>
                </div>
                {listType === recommendType &&
                  <div className={styles.filterList}>
                    <Select rounded={10} size="sm" variant="filled" onChange={e => handleActiveTag(e)}>
                      {[{ 'emotion_tag': 'all', 'description': '全部' }, ...userTagList].map((data, index) => (
                        <option key={index} value={data.emotion_tag}>{data.description}</option>
                      ))}
                    </Select>
                    <InputGroup style={{ 'marginLeft': '1rem' }}>
                      <Input rounded={10} variant="filled" size="sm" type="text" placeholder="請輸入歌名"
                        value={searchInputValue} onChange={e => handleSearch(e)} />
                      <Button rounded={10} size="sm" isDisabled={!searchInputValue} colorScheme="teal" variant="ghost" onClick={() => getQueryData()}>
                        <SearchIcon />
                      </Button>
                    </InputGroup>
                  </div>
                }
              </TabList>
            </Tabs>
            <MusicList musicData={listData} />
          </div>
        </section>
      </section>
      {loading && <Loading />}
    </FrontendLayout>
  );
}