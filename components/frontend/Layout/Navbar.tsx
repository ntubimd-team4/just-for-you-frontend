import Image from 'next/image';
import Logo from '@/public/images/logo.png';
import styles from '@/styles/frontend/_Navbar.module.scss';
import { FiMessageSquare, FiMusic } from 'react-icons/fi';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { status } = useSession();

  return (
    <nav className={styles.container}>
      <Link href={'/'}>
        <Image src={Logo} alt="logo" className={styles.logo} height={60} width={60} />
      </Link>
      {status === 'authenticated' &&
        <section className={styles.menu}>
          <Link href={'/story'}>
            <FiMessageSquare className={styles.icon} />
          </Link>
          <Link href={'/recommend'}>
            <FiMusic className={styles.icon} />
          </Link>
        </section>
      }
    </nav>
  );
}