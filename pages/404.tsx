import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Page404() {
  return (
    <Layout headTitle="404">
      <h1>無此頁面</h1>
      <Link href={'/'}>回首頁</Link>
    </Layout>
  );
}