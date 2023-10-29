import { ReactNode } from 'react';
import {
  Box, Flex, Avatar, HStack, IconButton, Button, Menu, MenuButton, MenuList, MenuItem,
  MenuDivider, useDisclosure, useColorModeValue, Stack, MenuGroup,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useAuthContext } from '@/context/authContext';
import { StudentLinks, TeacherLinks } from './NavData';
import Image from 'next/image';
import Logo from '/public/images/logo.png';

const NavLink = ({ children, link }: { children: ReactNode, link: string }) => (
  <Link href={link}>{children}</Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 'data': session, status } = useSession();
  const { authorization } = useAuthContext();

  const handleGoogleLogOut = async () => {
    signOut({ 'callbackUrl': 'http://localhost:3000' });
    localStorage.clear();
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={10}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ 'md': 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box className={'flex'}>
            <Link href="/">
              <Image src={Logo} alt={'logo'} width={40} height={40} />
            </Link>
          </Box>
          {status === 'authenticated' &&
            <HStack
              as={'nav'}
              spacing={4}
              display={{ 'base': 'none', 'md': 'flex' }}>
              {(authorization === '學生' ? StudentLinks : TeacherLinks).map(data => (
                <NavLink key={data.link} link={data.link}>{data.text}</NavLink>
              ))}
            </HStack>
          }
        </HStack>
        {status === 'authenticated' &&
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={session?.user?.image || undefined}
                />
              </MenuButton>
              <MenuList>
                <MenuGroup title={`${session?.user?.name} ${authorization}`}>
                  <Link href={'/profile'}><MenuItem>我的帳戶</MenuItem></Link>
                  <MenuDivider />
                  <MenuItem onClick={handleGoogleLogOut}>登出</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        }
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ 'md': 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {(authorization === '學生' ? StudentLinks : TeacherLinks).map(data => (
              <NavLink key={data.link} link={data.link}>{data.text}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}