import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, useDisclosure, Button, FormControl, FormLabel, RadioGroup, Stack, Radio } from '@chakra-ui/react';
import { AccountListType } from '@/ts/interface/User.interface';
import { ChangeEvent, useEffect, useState } from 'react';
import userAPI from '@/services/userAccountAPI';
import { useRouter } from 'next/router';

export function EditProfileModal({ data }: { data: AccountListType }) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [department, setDepartment] = useState('');
  const [value, setValue] = useState('');

  const handleDepartmentChange = (event: any) => setDepartment(event.target.value);

  useEffect(() => {
    if (data) {
      setDepartment(data?.department ? data.department : '');
      setValue((data?.userSex === '男') ? '0' : (data?.userSex === '女') ? '1' : '');
    }
  }, [data]);

  const patchAccount = async () => {
    try {
      await userAPI.patchAccount({
        'userId': data.userId,
        'userSex': value,
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
              <RadioGroup onChange={setValue} value={value}>
                <Stack direction="row">
                  <Radio value="0">男姓</Radio>
                  <Radio value="1">女性</Radio>
                </Stack>
              </RadioGroup>
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