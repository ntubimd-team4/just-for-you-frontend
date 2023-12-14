import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/router';
import Loading from '@/components/base/Loading';
import Head from 'next/head';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const { authorization } = useAuthContext();

  useEffect(() => {
    if (status === 'authenticated' && authorization !== null) {
      if (authorization === '個案管理師') {
        router.push('/account-manage');
      } else if (authorization === '諮商師') {
        router.push('/consultation-manage');
      } else if (authorization === '學生') {
        router.push('/story');
      }
    } else if (status === 'loading') {
      <Loading />;
    } else {
      router.push('/login');
    }
  }, [authorization, router, status]);

  return (
    <>
      <Head>
        <title>諮屬於你</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="諮屬於你-找到您的心靈場所" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="copyright" content="諮屬於你" />
        <meta name="og:title" content="諮屬於你" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Loading />
    </>
  );
}