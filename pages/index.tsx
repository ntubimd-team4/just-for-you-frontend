import Layout from '@/components/Layout';
import LoginBtn from '@/components/LoginBtn';
import userAPI from '@/services/userAPI';
import { Button, Container, Textarea } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Home() {
  const { 'data': session, status } = useSession();
  const [story, setStory] = useState('');

  const handleStory = (event: any) => setStory(event?.target.value);
  const tellStory = () => {
    userAPI.postSummary({ 'prompt': story });
  };

  return (
    <Layout headTitle={'首頁'}>
      {status === 'authenticated' ?
        <Container centerContent>
          <h2>請告訴我您想說的話吧！</h2>
          <Textarea placeholder="請告訴我您想說的話吧！" size="lg" onChange={(e: any) => handleStory(e)} row={10} my={10} />
          <Button colorScheme="pink" variant="solid" onClick={() => tellStory()}>
            確認
          </Button>
        </Container> :
        <LoginBtn />
      }
    </Layout>
  );
}