import BackendLayout from '@/components/backend/Layout';
import userAPI from '@/services/userAccountAPI';
import { AccountListType } from '@/ts/interface/User.interface';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Tag } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Consultation() {
  const router = useRouter();
  const { status } = useSession();
  const [rowData, setRowData] = useState<AccountListType[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          const response = await userAPI.getStudentList();
          const data = response.data;

          setRowData(data);
        } catch (error: any) {
          alert(error.message);
        }
      };

      fetchData();
    }
  }, [router, status]);

  return (
    <BackendLayout>
      <h1 style={{ 'marginBottom': '1rem', 'fontSize': '25px' }}>個案管理</h1>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>使用者姓名</Th>
              <Th>使用者信箱</Th>
              <Th>科系</Th>
              <Th>性別</Th>
              <Th>摘要紀錄</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rowData?.map((data: any, i: number) => (
              <Tr key={i}>
                <Td>{data.userName}</Td>
                <Td>{data.userId}</Td>
                <Td>{data.department !== null ? data.department : '待填寫'}</Td>
                <Td><Tag colorScheme={(data?.userSex === '男') ? 'blue' : (data?.userSex === '女') ? 'red' : ''}>
                  {data.userSex !== null ? data.userSex : '待填寫'}</Tag></Td>
                <Td>
                  <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    _focus={{ 'bg': 'gray.200', }}
                    aria-label="詳細記錄"
                    onClick={() => router.push(`/consultation-manage/${data.userId}`)}>
                    詳細記錄
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </BackendLayout>
  );
}