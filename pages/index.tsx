import Layout from '@/components/Layout';
import { Container } from '@chakra-ui/layout';

export default function Home() {
  return (
    <Layout headTitle={'首頁'}>
      <Container maxW="container.sm" centerContent>
        <h1>Hello</h1>
      </Container>
    </Layout>
  );
}