import { signIn } from 'next-auth/react';

export default function LoginBtn() {
  async function handleGoogleSignIn() {
    signIn('google', { 'callbackUrl': 'http://localhost:3000' });
  }

  return (
    <button onClick={handleGoogleSignIn}>登入</button>
  );
}