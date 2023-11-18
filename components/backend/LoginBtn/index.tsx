import { signIn } from 'next-auth/react';
import Image from 'next/image';
import GoogleLogo from '/public/images/google-logo.png';
import styles from './_LoginBtn.module.scss';
import { Title } from '@/components/frontend/Illustrators/titleSVG';
import { Monsters } from '@/components/frontend/Illustrators/monstersSVG';

export default function LoginBtn() {
  const handleGoogleSignIn = async () => {
    signIn('google', { 'callbackUrl': process.env.NEXT_PUBLIC_CALLBACK_URL });
  };

  return (
    <section className={styles.loginWrap}>
      <Title />
      <Monsters />
      <button onClick={handleGoogleSignIn} className={styles.btn}>
        <Image src={GoogleLogo} alt={'google'} width={20} height={20} />
        使用 Google 登入
      </button>
    </section>
  );
}