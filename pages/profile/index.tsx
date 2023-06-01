import Layout from '@/components/Layout';
import { WrapItem, Avatar, Container, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import userAPI from '@/services/userAPI';
import { CustomControlsExample } from '@/components/EditAble';

export type AccountType = {
  userName: string,
  userId: string,
  userSex: string,
  picture: string,
  department: string,
  role: string,
}

export default function Profile() {
  const [profileData, setProfileData] = useState<AccountType>();

  useEffect(() => {
    (async () => {
      try {
        const response = await userAPI.getProfile();
        const data = response.data;

        setProfileData(data);
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <Layout headTitle={'我的帳戶'}>
      <Container centerContent>
        <WrapItem>
          <Avatar size="2xl" name={profileData?.userName} src={profileData?.picture} />{' '}
        </WrapItem>
        <h1>{profileData?.userName}</h1>
        <h1>{profileData?.role}</h1>
        <h1>{profileData?.userId}</h1>
        <h1>{profileData?.department ? profileData?.department : 'no'}</h1>
        <Input value={profileData?.userSex ? profileData?.userSex : ''} />
        {/* <CustomControlsExample /> */}
      </Container>
    </Layout>
  );
}