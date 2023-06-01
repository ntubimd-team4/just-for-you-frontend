import Layout from '@/components/Layout';
import TableComponent from '@/components/Table';

export default function AccountList() {
  return (
    <Layout headTitle={'帳號管理'}>
      <TableComponent />
    </Layout>
  );
}