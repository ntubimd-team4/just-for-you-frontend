import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  const { 'data': session } = useSession();

  if (session) {
    return (
      <>
        <div>Welcome, {session.user?.email}</div>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  } else {
    return (
      <button onClick={() => signIn()}>SignIn</button>
    );
  }
}