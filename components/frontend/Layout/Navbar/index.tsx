import styles from '@/styles/frontend/_Navbar.module.scss';
import { FiMessageSquare, FiMusic } from 'react-icons/fi';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, Button, Flex, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';
import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const { 'data': session, status } = useSession();
  const { authorization } = useAuthContext();

  const handleGoogleLogOut = async () => {
    signOut({ 'callbackUrl': process.env.NEXT_PUBLIC_CALLBACK_URL });
    localStorage.clear();
  };

  const redirectMyMusic = () => {
    router.push('/my-music');
  };

  return (
    <nav className={styles.container}>
      <Link className={styles.logo} href={'/'}>
        Just Fout You
      </Link>
      {status === 'authenticated' &&
        <section className={styles.menu}>
          <Link href={'/story'}>
            <FiMessageSquare className={styles.icon} />
          </Link>
          <Link href={'/my-music'}>
            <FiMusic className={styles.icon} />
          </Link>
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
                  <MenuItem onClick={() => redirectMyMusic()}>我的音樂</MenuItem>
                  <MenuItem onClick={handleGoogleLogOut}>登出</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </section>
      }
    </nav>
  );
}