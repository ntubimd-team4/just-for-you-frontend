import FrontendLayout from '@/components/frontend/Layout';
import styles from '@/styles/frontend/_Login.module.scss';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

export default function Login() {
  const handleGoogleSignIn = async () => {
    signIn('google', { 'callbackUrl': process.env.NEXT_PUBLIC_CALLBACK_URL, 'prompt': 'select_account', });
  };

  const LoginBtn = ({ role }: { role: string }) => (
    <button className={`${styles.btn} ${role === '學生' ? styles.student : styles.teacher}`} onClick={handleGoogleSignIn}>
      <FaGoogle />
      <span>北商{role} Google 登入</span>
    </button>
  );

  return (
    <FrontendLayout>
      <section className={styles.container}>
        <div className={styles.items}>
          <p className={styles.mainTitle}>諮屬於你</p>
          <p className={styles.subTitle}>只屬於你的心靈傾訴場所</p>
          <div className={styles.btnGroup}>
            <LoginBtn role="學生" />
            <LoginBtn role="諮商師" />
          </div>
        </div>
        <div className={styles.items}></div>
      </section>
    </FrontendLayout>
  );
}