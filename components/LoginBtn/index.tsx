import { signIn } from 'next-auth/react';
import Image from 'next/image';
import GoogleLogo from '../../public/images/google-logo.png';
import styles from './_LoginBtn.module.scss';

export default function LoginBtn() {
  async function handleGoogleSignIn() {
    signIn('google', { 'callbackUrl': 'http://localhost:3000' });
  }

  return (
    <section className={styles.loginWrap}>
      <h1>諮屬於你</h1>
      <p>屬於你的心靈傾訴場所</p>
      <button onClick={handleGoogleSignIn} className={styles.btn}>
        <Image src={GoogleLogo} alt={'google'} width={20} height={20} />
        使用 Google 登入
      </button>
    </section>
  );
}