import Layout from '@/components/Layout';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const title = {
  'fontSize': '40px',
  'fontWeight': 'bold'
};

export default function Consultation() {
  const route = useRouter();

  return (
    <Layout headTitle={'諮商管理'}>
      <h2 style={title}>功能開發中...</h2>
      <Button width="100%" colorScheme="green" my={5} variant="solid" onClick={() => route.push('/')}>
        回首頁
      </Button>
    </Layout>
  );
}