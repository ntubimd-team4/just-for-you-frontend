import Layout from '@/components/backend/Layout';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Avatar,
  Badge,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import userAPI from '@/services/userAccountAPI';
import { EditProfileModal } from '@/components/backend/EditProfileModal';
import { AccountListType } from '@/types/User.interface';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export type AccountType = {
  userName: string,
  userId: string,
  userSex: string,
  picture: string,
  department: string,
  role: string,
}

export default function Profile() {
  const router = useRouter();
  const { status } = useSession();
  const [profileData, setProfileData] = useState<AccountType>();
  const [singleData, setSingleData] = useState<AccountListType>({});

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      const fetchProfileData = async () => {
        try {
          const response = await userAPI.getProfile();
          const data = response.data;

          setProfileData(data);
        } catch (error: any) {
          alert(error.message);
        }
      };

      fetchProfileData();
    }
  }, [router, status]);

  const handleEdit = async (userId: string | undefined) => {
    try {
      const response = await userAPI.getSingleUser(userId);

      setSingleData(response.data);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Layout>
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

          <Stack mt={8} direction={'row'} spacing={4}
            onClick={() => handleEdit(profileData?.userId)}>
            <EditProfileModal data={singleData} />
          </Stack>
        </Box>
      </Center>
    </Layout>
  );
}