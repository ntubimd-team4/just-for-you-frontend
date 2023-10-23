import Layout from '@/components/frontend/Layout';
import LoginBtn from '@/components/backend/LoginBtn';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'authenticated') {
    router.push('/');
  } else {
    return (
      <Layout>
        <LoginBtn />
      </Layout>
    );
  }
}