import GoogleLoginBtn from '@/components/GoogleLoginBtn';
import Layout from '@/components/Layout';

export default function Login() {
  return (
    <Layout headTitle={'登入'}>
      <GoogleLoginBtn />
    </Layout>
  );
}