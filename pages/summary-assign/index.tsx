import Layout from '@/components/backend/Layout';
import summaryAPI from '@/services/summaryRecordAPI';
import userAPI from '@/services/userAccountAPI';
import { AccountListType } from '@/types/User.interface';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Select, Tabs, Tab, TabList, TabPanel, TabPanels, Tag } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';

export default function SummaryAssign() {
  const router = useRouter();
  const { status } = useSession();
  const [rowData, setRowData] = useState<AccountListType[]>([]);
  const [teacherList, setTeacherList] = useState([]);
  const [isAssign, setIsAssign] = useState(0);

  const TableList = () => (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>級別</Th>
            <Th>使用者姓名</Th>
            <Th>摘要</Th>
            <Th>諮商主題</Th>
            <Th>負責諮商師</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rowData?.map((data: any, i: number) => (
            <Tr key={i}>
              <Td><Tag colorScheme={(data.level === '第四級') ? 'red' : (data.level === '第三級') ? 'orange' :
                (data.level === '第二級') ? 'green' : 'gray'}>
                {data.level}</Tag>
              </Td>
              <Td>{data.userName}</Td>
              <Td>{(data.summary).length > 30 ? `${(data.summary).substring(0, 30)}......` :
                data.summary}</Td>
              <Td>{(data.topic).length > 30 ? `${(data.topic).substring(0, 30)}......` :
                data.topic}</Td>
              <Td>
                {data.teacher ? data.teacher :
                  <Select onChange={e => handleAssign(e, data.sid)} placeholder={data.teacher ? data.teacher : '尚未分配'}>
                    {teacherList && teacherList.map((data: any, index) => (
                      <option key={index} value={data.userId}>{data.userName}</option>
                    ))}
                  </Select>
                }
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          const response = await summaryAPI.getAssignList(isAssign);
          const teacherData = await userAPI.getTeacherList();

          setRowData(response.data);
          setTeacherList(teacherData.data);
        } catch (error: any) {
          alert(error.message);
        }
      };

      fetchData();
    }
  }, [isAssign, router, status]);

  const handleAssign = (e: ChangeEvent<HTMLSelectElement>, sid: string) => {
    const teacherId = e.target.value;

    const assignTeacher = async () => {
      try {
        const response = await summaryAPI.assignSummary({ sid, 'teacher': teacherId });

        await alert(response.message);
      } catch (error: any) {
        alert(error.message);
      }
    };

    assignTeacher();
  };

  return (
    <Layout>
      <h1 style={{ 'marginBottom': '1rem', 'fontSize': '25px' }}>摘要分配</h1>
      <Tabs>
        <TabList>
          <Tab onClick={() => setIsAssign(0)}>未分配</Tab>
          <Tab onClick={() => setIsAssign(1)}>已分配</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TableList />
          </TabPanel>
          <TabPanel>
            <TableList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}