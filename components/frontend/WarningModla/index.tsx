import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import PhoneForm from '/public/images/phone.jpg';

export function WarningModal() {
  const [isOpen, setIsOpen] = useState(true);
  const { 'data': session } = useSession();
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>貼心提醒</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <p>
            您好，{session?.user?.name}：<br />
            如果您現在狀況很不好，請立即告知諮商師或與信任的家人陪同聯繫，去醫療診所就醫。<br />
          </p>
          <Image src={PhoneForm} alt={''} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" onClick={onClose}>確認</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}