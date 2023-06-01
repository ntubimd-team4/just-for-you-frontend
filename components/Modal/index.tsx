import { Box, IconButton, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, useDisclosure, Button, FormControl, FormLabel, } from '@chakra-ui/react';
import { AccountListType } from '@/types/User.interface.ts';
import { EditIcon } from '@chakra-ui/icons';
import { ChangeEvent, useState } from 'react';
import userAPI from '@/services/userAPI';

export function InitialFocus({ data }: { data: AccountListType }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [department, setDepartment] = useState(data?.department);
  const [sex, setSex] = useState(data?.userSex);
  const handleDepartmentChange = (event: any) => console.log(event.target.value);
  const handleSexChange = (event: any) => setSex(event.target.value);

  async function patchAccount() {
    try {
      await userAPI.patchAccount({
        'userId': data.userId,
        'userSex': data.userSex,
        'department': data.department
      });
    } catch (err) {
      console.log('catch', err);
    }
  }

  return (
    <>
      <IconButton onClick={onOpen} aria-label="修改資料" icon={<EditIcon />} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data?.userName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box>{data?.role}{' / '}{data?.userId}</Box>

            <FormControl mt={4}>
              <FormLabel>系別</FormLabel>
              <Input placeholder="請填寫科系"
                onChange={(e: ChangeEvent) => handleDepartmentChange(e)}
                value={department}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>性別</FormLabel>
              <Select placeholder="請選擇性別" onChange={(e: ChangeEvent) => handleSexChange(e)} value={sex}>
                <option value="男">男</option>
                <option value="女">女</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={patchAccount} colorScheme="blue" mr={3}>儲存</Button>
            <Button onClick={onClose}>取消</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}