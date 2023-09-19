import Layout from '@/components/Layout';
import { Button, Container, Textarea, Alert, AlertIcon, Tag } from '@chakra-ui/react';
import userAPI from '@/services/userAccountAPI';
import { useState } from 'react';

const title = {
  'fontSize': '40px',
  'fontWeight': 'bold',
  'margin': '1.5rem'
};

export default function Story() {
  const [isTell, setIsTell] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [story, setStory] = useState('');
  const [emotionData, setEmotionData] = useState([]);
  const handleStory = (event: any) => setStory(event?.target.value);

  async function tellStory() {
    setIsLoading(true);
    try {
      const response = await userAPI.postSummary({ 'prompt': story });

      setIsLoading(false);
      setEmotionData(response.data.value.split(','));
      setIsTell(true);
    } catch (err: any) {
      setIsLoading(false);
      alert(err.message);
    }
  }

  return (
    <Layout headTitle={'我的樹洞'}>
      <Container centerContent>
        {!isTell ?
          <>
            <h2 style={title}>您的專屬樹洞</h2>
            <Textarea placeholder="請告訴我您想說的話吧！" size="lg" onChange={(e: any) => handleStory(e)} my={5} />
            <Button isLoading={loading} width="100%" colorScheme="green" color="white" variant="solid" onClick={() => tellStory()}>
              與樹洞訴說我的故事
            </Button>
            <Alert status="info" mt={10}>
              <AlertIcon />
              歡迎您來到心靈樹洞，尋找情緒的寄託，讓心情得以釋放。在這裡，您可以自由地表達自己，
              與樹洞分享內心的所思所感。樹洞還會為您推薦心靈音樂，為您帶來更多的安慰和啟發。讓我們一起深入內心，與音樂共舞，找到情感的共鳴。
            </Alert>
          </> :
          <>
            <h2 style={title}>樹洞感應到您有的情緒</h2>
            <div>
              {emotionData.map((d, i) =>
                <Tag size={'lg'} key={i} variant="solid" colorScheme="teal" m={2}>{d}</Tag>)
              }
            </div>
            <Alert status="warning" my={5}>
              <AlertIcon />
              注意：本系統並非心理諮商醫療診斷工具。如果您正面臨嚴重的心理健康問題，請立即尋求專業心理醫療服務。
            </Alert>
          </>
        }
      </Container>
    </Layout>
  );
}