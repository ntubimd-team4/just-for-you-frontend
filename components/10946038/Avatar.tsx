import { Accordion, Avatar, AvatarBadge, AvatarGroup, Wrap, WrapItem } from '@chakra-ui/react';
export default function MyAvatar(){
  return (
    <Accordion m={4}>
      <Wrap>
        <WrapItem>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </WrapItem>
        <WrapItem>
          <Avatar name="Kola Tioluwani" src="https://bit.ly/tioluwani-kolawole" />
        </WrapItem>
        <WrapItem>
          <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
        </WrapItem>
        <WrapItem>
          <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
        </WrapItem>
        <WrapItem>
          <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
        </WrapItem>
        <WrapItem>
          <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
        </WrapItem>
        <WrapItem>
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
        </WrapItem>
      </Wrap>
    </Accordion>
  );
}