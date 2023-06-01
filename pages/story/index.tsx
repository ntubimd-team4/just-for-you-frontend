import Layout from '@/components/Layout';
import LoginBtn from '@/components/LoginBtn';
import { Button, Textarea } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

export default function Story() {
  const { 'data': session, status } = useSession();

  return (
    <Layout headTitle={'樹洞'}>
      {status === 'authenticated' ?
        <div>
          <h2>請告訴我您想說的話吧！</h2>
          <Textarea placeholder="Here is a sample placeholder" />
          <Button colorScheme="pink" variant="solid">
            確認
          </Button>
        </div> :
        <LoginBtn />
      }
    </Layout>
  );
}