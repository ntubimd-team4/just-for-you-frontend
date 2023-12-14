import BackendLayout from '@/components/backend/Layout';
import userAPI from '@/services/userAccountAPI';
import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Switch, Tag } from '@chakra-ui/react';
import { EditProfileModal } from '@/components/backend/EditProfileModal';
import { AccountListType } from '@/ts/interface/User.interface';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function AccountList() {
  const { status } = useSession();
  const router = useRouter();
  const [rowData, setRowData] = useState<AccountListType[]>([]);
  const [singleData, setSingleData] = useState<AccountListType>({});

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          const response = await userAPI.getAllList({ 'type': 0, 'page': 1, 'count': 50 });
          const data = response.data;

          setRowData(data);
        } catch (error: any) {
          alert(error.message);
        }
      };

      fetchData();
    }
  }, [router, status]);

  const handleEdit = async (userId: string) => {
    try {
      const response = await userAPI.getSingleUser(userId);

      setSingleData(response.data);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleStatue = async (userId: string) => {
    try {
      await userAPI.patchStatus({ 'userId': userId });
      const response = await userAPI.getAllList({ 'type': 0, 'page': 1, 'count': 50 });
      const data = response.data;

      setRowData(data);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <BackendLayout>
      <h1 style={{ 'marginBottom': '1rem', 'fontSize': '25px' }}>帳號管理</h1>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>使用者姓名</Th>
              <Th>使用者信箱</Th>
              <Th>科系</Th>
              <Th>性別</Th>
              <Th>身分</Th>
              <Th>修改</Th>
              <Th>狀態</Th>
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
                <Td><Tag colorScheme={(data?.role === '個案管理師') ? 'green' : (data?.role === '諮商師') ? 'teal' : 'purple'}>
                  {data.role}</Tag></Td>
                <Td onClick={() => handleEdit(data.userId)}>
                  <EditProfileModal data={singleData} />
                </Td>
                <Td onClick={() => handleStatue(data.userId)}><Switch id="status" isChecked={data.available} /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </BackendLayout>
  );
}