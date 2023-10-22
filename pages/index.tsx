import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/router';
import Loading from '@/components/frontend/Loading';

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
    <Loading hint={'載入中'} />
  );
}