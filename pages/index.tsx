import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/router';
import Layout from '@/components/backend/Layout';
import LoginBtn from '@/components/backend/LoginBtn';

export default function Home() {
  const { 'data': session, status } = useSession();
  const route = useRouter();
  const { authorization } = useAuthContext();

  useEffect(() => {
    if (status === 'authenticated') {
      if (authorization === '學生') {
        route.push('/story');
      } else if (authorization === '諮商師') {
        route.push('/account-manage');
      }
    } else if (status === 'unauthenticated') {
      route.push('/login');
    } else if (status === 'loading') {
      console.log('loading...');
    }
  }, [authorization, route, status]);

  return (
    <Layout>
    </Layout>
  );
}