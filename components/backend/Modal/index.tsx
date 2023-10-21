import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, useDisclosure, Button, FormControl, FormLabel, } from '@chakra-ui/react';
import { AccountListType } from '@/types/User.interface';
import { ChangeEvent, useState } from 'react';
import userAPI from '@/services/userAccountAPI';
import { useRouter } from 'next/router';

export function EditProfileModal({ data }: { data: AccountListType }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [department, setDepartment] = useState(data?.department);
  const [sex, setSex] = useState(data?.userSex);
  const handleDepartmentChange = (event: any) => setDepartment(event.target.value);
  const handleSexChange = (event: any) => setSex(event.target.value);
  const router = useRouter();

  const patchAccount = async () => {
    try {
      await userAPI.patchAccount({
        'userId': data.userId,
        'userSex': sex === '男' ? 0 : 1,
        'department': department
      });
      onClose();
      router.reload();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <Button flex={1}
        fontSize={'sm'}
        rounded={'full'}
        _focus={{ 'bg': 'gray.200', }} onClick={onOpen} aria-label="編輯資料">
          編輯資料
      </Button>
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
              <FormLabel>科系</FormLabel>
              <Input placeholder="請填寫科系"
                onChange={(e: ChangeEvent) => handleDepartmentChange(e)}
                value={department}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>性別</FormLabel>
              <Input placeholder="請填寫性別"
                onChange={(e: ChangeEvent) => handleSexChange(e)}
                value={sex}
              />
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