import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  'providers': [
    GoogleProvider({
      'clientId': process.env.GOOGLE_CLIENT_ID as string,
      'clientSecret': process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  'secret': process.env.JWT_SECRET,
  'callbacks': {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.id_token = token.id_token as string;
      return session;
    },
  },
});