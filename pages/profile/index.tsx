import Layout from '@/components/Layout';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Avatar,
  Badge,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import userAPI from '@/services/userAPI';

export type AccountType = {
  userName: string,
  userId: string,
  userSex: string,
  picture: string,
  department: string,
  role: string,
}

export default function Profile() {
  const [profileData, setProfileData] = useState<AccountType>();

  useEffect(() => {
    (async () => {
      try {
        const response = await userAPI.getProfile();
        const data = response.data;

        setProfileData(data);
      } catch (error: any) {
        alert(error.message);
      }
    })();
  }, []);

  return (
    <Layout headTitle={'我的帳戶'}>
      <Center py={6}>
        <Box
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            src={profileData?.picture}
            mb={4}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {profileData?.userName}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {profileData?.userId}
          </Text>

          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              colorScheme="red"
              fontWeight={'400'}>
              {profileData?.userSex}
            </Badge>
            <Badge
              px={2}
              py={1}
              colorScheme="green"
              fontWeight={'400'}>
              {profileData?.department}
            </Badge>
            <Badge
              px={2}
              py={1}
              colorScheme="purple"
              fontWeight={'400'}>
              {profileData?.role}
            </Badge>
          </Stack>

          <Stack mt={8} direction={'row'} spacing={4}>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              _focus={{ 'bg': 'gray.200', }}>
              編輯資料
            </Button>
          </Stack>
        </Box>
      </Center>
      {/* <Container centerContent>
        <WrapItem>
          <Avatar size="2xl" name={profileData?.userName} src={profileData?.picture} />{' '}
        </WrapItem>
        <h1>{profileData?.userName}</h1>
        <h1>{profileData?.role}</h1>
        <h1>{profileData?.userId}</h1>
        <h1>{profileData?.department ? profileData?.department : 'no'}</h1>
        <h1>{profileData?.userSex ? profileData?.userSex : 'no'}</h1>
      </Container> */}
    </Layout>
  );
}